/**
 * ═══════════════════════════════════════════════════════════
 *  ️ خادم API - مصنع رويال للأنابيب
 * ═══════════════════════════════════════════════════════════
 *
 *  Node.js + Express + MySQL
 *  يوفر واجهة API كاملة لإدارة الموقع
 *
 *  التشغيل: npm start
 *  المنفذ: 3000 (أو حسب PORT في .env)
 */

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'royal-secret-key-2026';

// ─── Middleware ───
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', '*', 'https://royal-pipes.netlify.app'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── ملف uploads ───
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'));
  }
});

// ─── اتصال MySQL ───
let pool;
async function initPool() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'royal_pipes',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
  });

  // اختبار الاتصال
  try {
    const conn = await pool.getConnection();
    console.log('✅ متصل بقاعدة البيانات MySQL');
    conn.release();
  } catch (err) {
    console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
  }
}

// ─── Authentication Middleware ───
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'غير مصرح' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'توكن غير صالح' });
  }
}

// ═══════════════════════════════════════════════════════════
//  🔐 تسجيل الدخول
// ═══════════════════════════════════════════════════════════
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'بيانات غير مكتملة' });

    const [rows] = await pool.query('SELECT * FROM admin_users WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });

    const valid = bcrypt.compareSync(password, rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });

    const token = jwt.sign({ id: rows[0].id, username: rows[0].username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: rows[0].username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════
//  📦 المنتجات
// ═══════════════════════════════════════════════════════════
app.get('/api/products', async (req, res) => {
  try {
    const { category, subcategory, search, featured, sort } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category) { sql += ' AND category_id = ?'; params.push(category); }
    if (subcategory) { sql += ' AND subcategory_id = ?'; params.push(subcategory); }
    if (search) { sql += ' AND (name LIKE ? OR description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    if (featured === 'true') { sql += ' AND featured = 1'; }

    const orderBy = sort === 'price_asc' ? 'price ASC' : sort === 'price_desc' ? 'price DESC' : 'created_at DESC';
    sql += ` ORDER BY ${orderBy}`;

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'المنتج غير موجود' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', authMiddleware, async (req, res) => {
  try {
    const { name, category_id, subcategory_id, price, currency, description, image, featured } = req.body;
    const id = 'p' + Date.now();
    const now = Date.now();
    
    await pool.query(
      'INSERT INTO products (id, name, category_id, subcategory_id, price, currency, description, image, featured, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, category_id, subcategory_id, price || 0, currency || 'ريال', description || '', image || '', featured || false, now, now]
    );
    res.json({ id, message: 'تم إضافة المنتج بنجاح' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    const { name, category_id, subcategory_id, price, currency, description, image, featured } = req.body;
    await pool.query(
      'UPDATE products SET name=?, category_id=?, subcategory_id=?, price=?, currency=?, description=?, image=?, featured=?, updated_at=? WHERE id=?',
      [name, category_id, subcategory_id, price, currency, description, image, featured, Date.now(), req.params.id]
    );
    res.json({ message: 'تم تحديث المنتج' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'تم حذف المنتج' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════
//  👥 الوكلاء
// ═══════════════════════════════════════════════════════════
app.get('/api/agents', async (req, res) => {
  try {
    const { governorate } = req.query;
    let sql = 'SELECT * FROM agents WHERE 1=1';
    const params = [];
    if (governorate) { sql += ' AND governorate_id = ?'; params.push(governorate); }
    sql += ' ORDER BY created_at DESC';
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/agents', authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, governorate_id, logo } = req.body;
    const id = 'ag' + Date.now();
    await pool.query(
      'INSERT INTO agents (id, name, phone, address, governorate_id, logo, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, phone || '', address || '', governorate_id || '', logo || '', Date.now()]
    );
    res.json({ id, message: 'تم إضافة الوكيل' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/agents/:id', authMiddleware, async (req, res) => {
  try {
    const { name, phone, address, governorate_id, logo } = req.body;
    await pool.query(
      'UPDATE agents SET name=?, phone=?, address=?, governorate_id=?, logo=? WHERE id=?',
      [name, phone, address, governorate_id, logo, req.params.id]
    );
    res.json({ message: 'تم تحديث الوكيل' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/agents/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM agents WHERE id = ?', [req.params.id]);
    res.json({ message: 'تم حذف الوكيل' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════
//  ️ البنرات
// ═══════════════════════════════════════════════════════════
app.get('/api/banners', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM banners ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/banners', authMiddleware, async (req, res) => {
  try {
    const { title, subtitle, cta, link, image, active } = req.body;
    const id = 'bn' + Date.now();
    await pool.query(
      'INSERT INTO banners (id, title, subtitle, cta, link, image, active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, title || '', subtitle || '', cta || '', link || '', image || '', active !== false, Date.now()]
    );
    res.json({ id, message: 'تم إضافة البانر' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/banners/:id', authMiddleware, async (req, res) => {
  try {
    const { title, subtitle, cta, link, image, active } = req.body;
    await pool.query(
      'UPDATE banners SET title=?, subtitle=?, cta=?, link=?, image=?, active=? WHERE id=?',
      [title, subtitle, cta, link, image, active, req.params.id]
    );
    res.json({ message: 'تم تحديث البانر' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/banners/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM banners WHERE id = ?', [req.params.id]);
    res.json({ message: 'تم حذف البانر' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ══════════════════════════════════════════════════════════
//  📬 الرسائل
// ═══════════════════════════════════════════════════════════
app.get('/api/messages', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const id = 'm' + Date.now();
    await pool.query(
      'INSERT INTO messages (id, name, email, phone, subject, message, read, created_at) VALUES (?, ?, ?, ?, ?, ?, 0, ?)',
      [id, name || '', email || '', phone || '', subject || '', message || '', Date.now()]
    );
    res.json({ id, message: 'تم إرسال رسالتك بنجاح' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/messages/:id/read', authMiddleware, async (req, res) => {
  try {
    await pool.query('UPDATE messages SET read = ? WHERE id = ?', [req.body.read !== false, req.params.id]);
    res.json({ message: 'تم تحديث حالة الرسالة' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/messages/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM messages WHERE id = ?', [req.params.id]);
    res.json({ message: 'تم حذف الرسالة' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════
//  ️ الإعدادات
// ═══════════════════════════════════════════════════════════
app.get('/api/settings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM settings');
    const settings = {};
    rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings/:key', authMiddleware, async (req, res) => {
  try {
    await pool.query(
      'INSERT INTO settings (setting_key, setting_value, updated_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value=?, updated_at=?',
      [req.params.key, JSON.stringify(req.body.value), Date.now(), JSON.stringify(req.body.value), Date.now()]
    );
    res.json({ message: 'تم حفظ الإعدادات' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════
//  📊 الإحصائيات
// ═══════════════════════════════════════════════════════════
app.get('/api/stats', async (req, res) => {
  try {
    const [[prod]] = await pool.query('SELECT COUNT(*) as count FROM products');
    const [[agent]] = await pool.query('SELECT COUNT(*) as count FROM agents');
    const [[msg]] = await pool.query('SELECT COUNT(*) as count FROM messages');
    const [[un]] = await pool.query('SELECT COUNT(*) as count FROM messages WHERE read = 0');
    res.json({
      products: prod.count,
      agents: agent.count,
      messages: msg.count,
      unread: un.count,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════
//  📸 رفع الصور
// ═══════════════════════════════════════════════════════════
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'لم يتم رفع صورة' });
  const url = `/api/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

app.use('/api/uploads', express.static(UPLOAD_DIR));

// ═══════════════════════════════════════════════════════════
//  تشغيل الخادم
// ═══════════════════════════════════════════════════════════
async function start() {
  await initPool();
  app.listen(PORT, () => {
    console.log(`\n🚀 خادم رويال يعمل على: http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`📦 المنتجات: http://localhost:${PORT}/api/products`);
  });
}

start();
