/**
 * ═══════════════════════════════════════════════════════════
 *  🗄️ إعداد قاعدة البيانات MySQL
 *  ═══════════════════════════════════════════════════════════
 *
 *  تشغيل: node setup-database.js
 *
 *  تأكد من وجود قاعدة بيانات باسم royal_pipes
 *  ومستخدم لديه صلاحيات CREATE و INSERT
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'royal_pipes',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function setup() {
  console.log('🔧 جاري الاتصال بقاعدة البيانات...');
  
  try {
    // 1. إنشاء الاتصال الأولي (بدون database)
    const conn = await mysql.createConnection({
      host: DB_CONFIG.host,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      port: DB_CONFIG.port,
    });

    // 2. إنشاء قاعدة البيانات
    await conn.query(`CREATE DATABASE IF NOT EXISTS ${DB_CONFIG.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log('✅ تم إنشاء قاعدة البيانات');

    await conn.query(`USE ${DB_CONFIG.database}`);

    // 3. إنشاء الجداول
    const tables = [
      `CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id VARCHAR(50) NOT NULL,
        subcategory_id VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) DEFAULT 0,
        currency VARCHAR(20) DEFAULT 'ريال',
        description TEXT,
        image TEXT,
        featured BOOLEAN DEFAULT FALSE,
        created_at BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000),
        updated_at BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000),
        INDEX idx_category (category_id),
        INDEX idx_featured (featured),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS agents (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT '',
        address TEXT DEFAULT '',
        governorate_id VARCHAR(50) DEFAULT '',
        logo TEXT,
        created_at BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000),
        INDEX idx_gov (governorate_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS banners (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) DEFAULT '',
        subtitle TEXT DEFAULT '',
        cta VARCHAR(100) DEFAULT '',
        link VARCHAR(255) DEFAULT '',
        image TEXT DEFAULT '',
        active BOOLEAN DEFAULT TRUE,
        expires_at VARCHAR(50),
        created_at BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) DEFAULT '',
        email VARCHAR(255) DEFAULT '',
        phone VARCHAR(50) DEFAULT '',
        subject VARCHAR(255) DEFAULT '',
        message TEXT DEFAULT '',
        read BOOLEAN DEFAULT FALSE,
        created_at BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000),
        INDEX idx_read (read),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(50) PRIMARY KEY,
        setting_value JSON,
        updated_at BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    ];

    for (const sql of tables) {
      await conn.query(sql);
    }
    console.log('✅ تم إنشاء جميع الجداول');

    // 4. إدخال البيانات الافتراضية
    await insertSeedData(conn);

    await conn.end();
    console.log('\n🎉 تم إعداد قاعدة البيانات بنجاح!');
    console.log(' قاعدة البيانات:', DB_CONFIG.database);
    console.log('📡 يمكن الآن تشغيل الـ API: npm start');

  } catch (err) {
    console.error(' خطأ:', err.message);
    process.exit(1);
  }
}

async function insertSeedData(conn) {
  const db = DB_CONFIG.database;

  // منتجات
  const products = [
    ['p1', 'ماسورة PVC-U أبيض 20ملم (½ بوصة)', 'plumbing', 'pvc-pipes', 85, 'ريال', 'ماسورة PVC-U أبيض اللون، قطر 20 ملم (½ بوصة)، ضغط 10 بار، طول 3 متر. مصنعة وفق المواصفات القياسية الألمانية والأمريكية.', '/images/hero-pipes.jpg', 1],
    ['p2', 'ماسورة PVC-U أبيض 25ملم (¾ بوصة)', 'plumbing', 'pvc-pipes', 120, 'ريال', 'ماسورة PVC-U أبيض، قطر 25 ملم (¾ بوصة)، ضغط 10 بار.', '/images/hero-pipes.jpg', 0],
    ['p3', 'ماسورة PVC-U أبيض 110ملم (4 بوصة)', 'plumbing', 'pvc-pipes', 1100, 'ريال', 'ماسورة PVC-U أبيض، قطر 110 ملم، ضغط 6 بار. مناسبة لشبكات الصرف.', '/images/hero-pipes.jpg', 1],
    ['p4', 'ماسورة PE للري 32ملم - 100 متر', 'agriculture', 'irrigation-pipes', 380, 'ريال', 'ماسورة PE أسود للري، قطر 32 ملم، ضغط 6 بار.', '/images/agriculture-irrigation.jpg', 1],
    ['p5', 'أنبوب تنقيط 16ملم (1000 متر)', 'agriculture', 'drip-irrigation', 1800, 'ريال', 'أنبوب تنقيط PE أسود، قطر 16 ملم، طول 1000 متر.', '/images/agriculture-irrigation.jpg', 1],
    ['p6', 'سلك NYM 3×1.5 ملم (100 متر)', 'electrical', 'cables', 850, 'ريال', 'سلك كهرباء نوع NYM، 3 أسلاك × 1.5 ملم مربع.', '/images/electrical-cables.jpg', 1],
    ['p7', 'حديد تسليح 10ملم (12 متر)', 'building', 'rebar', 180, 'ريال', 'حديد تسليح رصاصي قطر 10 ملم.', '/images/building-materials.jpg', 1],
    ['p8', 'أسمنت بورتلاندي 50كغ', 'building', 'cement', 180, 'ريال', 'كيس أسمنت بورتلاندي نوع I، 50 كيلوجرام.', '/images/building-materials.jpg', 1],
    ['p9', 'دهان أكريليك أبيض مطفي 18 لتر', 'building', 'paint', 1450, 'ريال', 'دهان أكريليك مطفي أبيض.', '/images/building-materials.jpg', 1],
    ['p10', 'حبس كروي PVC ½ بوصة', 'plumbing', 'valves', 120, 'ريال', 'حبس كروي PVC-U نصف بوصة.', '/images/pvc-fittings.jpg', 1],
    ['p11', 'مرشة دوار صغيرة', 'agriculture', 'sprinklers', 180, 'ريال', 'مرشة ري دوار صغيرة.', '/images/agriculture-irrigation.jpg', 1],
    ['p12', 'لمبة LED 9 واط', 'electrical', 'lights', 75, 'ريال', 'لمبة LED موفرة للطاقة.', '/images/electrical-cables.jpg', 1],
  ];

  for (const p of products) {
    await conn.execute(
      `INSERT INTO ${db}.products (id, name, category_id, subcategory_id, price, currency, description, image, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id`,
      p
    );
  }
  console.log(`✅ تم إدراج ${products.length} منتج`);

  // وكلاء
  const agents = [
    ['a101', 'مؤسسة النور للتجارة', '+967 771 234 567', 'شارع الزبيري، صنعاء', 'sanaa'],
    ['a102', 'شركة الكبير للمواد', '+967 772 345 678', 'حي الحدادة، صنعاء', 'sanaa'],
    ['a103', 'مؤسسة عدن للسباكة', '+967 773 456 789', 'حي المعلا، عدن', 'aden'],
    ['a104', 'شركة تعز التجارية', '+967 774 567 890', 'حي الجحملية، تعز', 'taiz'],
    ['a105', 'مؤسسة حضرموت', '+967 775 678 901', 'حي المنصورة، المكلا', 'hadrmut'],
    ['a106', 'شركة إب للكهرباء', '+967 776 789 012', 'حي المركز، إب', 'ibb'],
    ['a107', 'مؤسسة الضالع', '+967 777 890 123', 'المركز، الضالع', 'aldhala'],
    ['a108', 'شركة البيضاء', '+967 778 901 234', 'المركز، البيضاء', 'albayda'],
    ['a109', 'مؤسسة مأرب', '+967 779 012 345', 'المركز، مأرب', 'marib'],
    ['a110', 'شركة الجوف', '+967 781 111 222', 'المركز، الجوف', 'aljawf'],
    ['a111', 'مؤسسة صعدة', '+967 782 222 333', 'حي المركز، صعدة', 'sadah'],
    ['a112', 'شركة عمران', '+967 783 333 444', 'المركز، عمران', 'amran'],
    ['a113', 'مؤسسة ذمار', '+967 784 444 555', 'المركز، ذمار', 'dhamar'],
    ['a114', 'شركة الحديدة', '+967 785 555 666', 'المركز، الحديدة', 'alhodiedah'],
    ['a115', 'مؤسسة لحج', '+967 786 666 777', 'المركز، لحج', 'lahij'],
    ['a116', 'شركة أبين', '+967 777 888 999', 'المركز، أبين', 'abin'],
    ['a117', 'مؤسسة شبوة', '+967 788 888 999', 'المركز، شبوة', 'shabwah'],
    ['a118', 'شركة المهرة', '+967 789 999 000', 'المركز، المهرة', 'almahrah'],
    ['a119', 'مؤسسة ريمة', '+967 781 222 444', 'المركز، ريمة', 'raymah'],
    ['a120', 'شركة المحويت', '+967 782 333 555', 'المركز، المحويت', 'almuhawit'],
    ['a121', 'مؤسسة حجة', '+967 783 444 666', 'المركز، حجة', 'hajjah'],
    ['a122', 'شركة سقطرى', '+967 784 555 777', 'المركز، سقطرى', 'socotra'],
  ];

  for (const a of agents) {
    await conn.execute(
      `INSERT INTO ${db}.agents (id, name, phone, address, governorate_id) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id`,
      a
    );
  }
  console.log(`✅ تم إدراج ${agents.length} وكيل`);

  // بنرات
  const banners = [
    ['bn1', 'مواسير رويال PVC-U... الجودة بكل المقاييس', 'مصنع الأنوار للبلاستيك.', 'اكتشف المنتجات', '#products/plumbing', '/images/hero-pipes.jpg', 1],
    ['bn2', 'شبكات الري والزراعة الحديثة', 'أنابيب تنقيط، مرشات، مضخات.', 'تصفح مواد الزراعة', '#products/agriculture', '/images/agriculture-irrigation.jpg', 1],
    ['bn3', 'ختم الجودة من رويال', 'ALANWAR GUARANTEE SINCE 1982', 'تعرف على مصنعنا', '#about', '/images/factory-production.jpg', 1],
  ];

  for (const b of banners) {
    await conn.execute(
      `INSERT INTO ${db}.banners (id, title, subtitle, cta, link, image, active) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id`,
      b
    );
  }
  console.log(`✅ تم إدراج ${banners.length} بانر`);

  // إعدادات
  await conn.execute(
    `INSERT INTO ${db}.settings (setting_key, setting_value) VALUES ('general', ?) ON DUPLICATE KEY UPDATE setting_key=setting_key`,
    [JSON.stringify({
      productName: 'مصنع رويال للأنابيب ومستلزماتها',
      tagline: 'Royal Factory for Pipes & Accessories',
      managerName: 'رمزي القحطاني - مسؤول المبيعات',
      salesPhone: '782002220',
      accountsPhone: '782002225',
      inquiryPhone: '782002229',
      deliveryPhone: '784414445',
      whatsapp: '+967 782 002 220',
      email: 'info@royal-pipes.com',
      address: 'مصنع الأنوار للبلاستيك - رويال',
    })]
  );
  console.log('✅ تم إدراج الإعدادات');

  // مدير النظام
  const bcrypt = require('bcryptjs');
  const hash = bcrypt.hashSync('royal2026', 10);
  await conn.execute(
    `INSERT INTO ${db}.admin_users (username, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE username=username`,
    ['admin', hash]
  );
  console.log('✅ تم إدراج حساب المدير (admin / royal2026)');
}

setup();
