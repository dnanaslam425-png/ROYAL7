══════════════════════════════════════════════════════════════════════
║  🏭 مصنع رويال للأنابيب ومستلزماتها                              ║
║  Ramzi Al-Qahtani - Royal Factory                                  ║
║  دليل الاستضافة السحابية الكامل                                    ║
╚══════════════════════════════════════════════════════════════════════

📦 الملفات المرفقة:
  ✅ الموقع كامل - مجلد dist/ (جاهز للرفع)
  ✅ SETUP_GUIDE.txt - خطوات الاستضافة مفصلة
  ✅ هذا الملف - دليل سريع

══════════════════════════════════════════════════════════════════════
🚀 3 خطوات فقط لنشر الموقع على الإنترنت!
══════════════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 الخطوة 1: قاعدة البيانات (5 دقائق) - supabase.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. افتح المتصفح: https://supabase.com
2. "Start your project" → سجّل دخول (Google/GitHub - مجاني)
3. "New Project" → الاسم: royal-pipes → اختر كلمة مرور قوية
4. انتظر دقيقة حتى يكتمل الإنشاء
5. من القائمة: SQL Editor → "New query"
6. انسخ هذا الكود بالكامل وألصقه:

─────── انسخ من هنا ───────

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT NOT NULL,
  subcategory_id TEXT NOT NULL,
  price NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'ريال',
  description TEXT,
  image TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT,
  updated_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT
);

CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  governorate_id TEXT DEFAULT '',
  logo TEXT,
  created_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT
);

CREATE TABLE IF NOT EXISTS banners (
  id TEXT PRIMARY KEY,
  title TEXT DEFAULT '',
  subtitle TEXT DEFAULT '',
  cta TEXT DEFAULT '',
  link TEXT DEFAULT '',
  image TEXT DEFAULT '',
  active BOOLEAN DEFAULT TRUE,
  expires_at TEXT,
  created_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT DEFAULT '',
  read BOOLEAN DEFAULT FALSE,
  created_at BIGINT DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB DEFAULT '{}'::JSONB
);

DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR ALL TABLES;

DROP POLICY IF EXISTS r_products ON products;
CREATE POLICY r_products ON products FOR ALL USING (true);
DROP POLICY IF EXISTS r_agents ON agents;
CREATE POLICY r_agents ON agents FOR ALL USING (true);
DROP POLICY IF EXISTS r_banners ON banners;
CREATE POLICY r_banners ON banners FOR ALL USING (true);
DROP POLICY IF EXISTS r_messages ON messages;
CREATE POLICY r_messages ON messages FOR ALL USING (true);
DROP POLICY IF EXISTS r_settings ON settings;
CREATE POLICY r_settings ON settings FOR ALL USING (true);

INSERT INTO products (id, name, category_id, subcategory_id, price, currency, description, image, featured) VALUES
('p1', 'ماسورة PVC-U أبيض 20ملم (½ بوصة)', 'plumbing', 'pvc-pipes', 85, 'ريال', 'ماسورة PVC-U أبيض، قطر 20 ملم، ضغط 10 بار.', '/images/hero-pipes.jpg', true),
('p2', 'ماسورة PVC-U أبيض 25ملم (¾ بوصة)', 'plumbing', 'pvc-pipes', 120, 'ريال', 'ماسورة PVC-U أبيض، قطر 25 ملم.', '/images/hero-pipes.jpg', false),
('p3', 'ماسورة PVC-U أبيض 110ملم (4 بوصة)', 'plumbing', 'pvc-pipes', 1100, 'ريال', 'ماسورة PVC-U أبيض، قطر 110 ملم، ضغط 6 بار.', '/images/hero-pipes.jpg', true),
('p4', 'ماسورة PE للري 32ملم - 100 متر', 'agriculture', 'irrigation-pipes', 380, 'ريال', 'ماسورة PE أسود للري، قطر 32 ملم.', '/images/agriculture-irrigation.jpg', true),
('p5', 'أنبوب تنقيط 16ملم (1000 متر)', 'agriculture', 'drip-irrigation', 1800, 'ريال', 'أنبوب تنقيط PE أسود.', '/images/agriculture-irrigation.jpg', true),
('p6', 'سلك NYM 3×1.5 ملم (100 متر)', 'electrical', 'cables', 850, 'ريال', 'سلك كهرباء NYM معزول.', '/images/electrical-cables.jpg', true),
('p7', 'حديد تسليح 10ملم (12 متر)', 'building', 'rebar', 180, 'ريال', 'حديد تسليح رصاصي.', '/images/building-materials.jpg', true),
('p8', 'أسمنت بورتلاندي 50كغ', 'building', 'cement', 180, 'ريال', 'كيس أسمنت نوع I.', '/images/building-materials.jpg', true),
('p9', 'دهان أكريليك أبيض مطفي 18 لتر', 'building', 'paint', 1450, 'ريال', 'دهان أكريليك مطفي أبيض.', '/images/building-materials.jpg', true),
('p10', 'حبس كروي PVC ½ بوصة', 'plumbing', 'valves', 120, 'ريال', 'حبس كروي PVC-U.', '/images/pvc-fittings.jpg', true),
('p11', 'مرشة دوار صغيرة', 'agriculture', 'sprinklers', 180, 'ريال', 'مرشة ري دوار صغيرة.', '/images/agriculture-irrigation.jpg', true),
('p12', 'لمبة LED 9 واط', 'electrical', 'lights', 75, 'ريال', 'لمبة LED موفرة.', '/images/electrical-cables.jpg', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agents (id, name, phone, address, governorate_id) VALUES
('a101', 'مؤسسة النور للتجارة', '+967 771 234 567', 'شارع الزبيري، صنعاء', 'sanaa'),
('a102', 'شركة الكبير للمواد', '+967 772 345 678', 'حي الحدادة، صنعاء', 'sanaa'),
('a103', 'مؤسسة عدن للسباكة', '+967 773 456 789', 'حي المعلا، عدن', 'aden'),
('a104', 'شركة تعز التجارية', '+967 774 567 890', 'حي الجحملية، تعز', 'taiz'),
('a105', 'مؤسسة حضرموت', '+967 775 678 901', 'حي المنصورة، المكلا', 'hadrmut'),
('a106', 'شركة إب للكهرباء', '+967 776 789 012', 'حي المركز، إب', 'ibb'),
('a107', 'مؤسسة الضالع', '+967 777 890 123', 'المركز، الضالع', 'aldhala'),
('a108', 'شركة البيضاء', '+967 778 901 234', 'المركز، البيضاء', 'albayda'),
('a109', 'مؤسسة مأرب', '+967 779 012 345', 'المركز، مأرب', 'marib'),
('a110', 'شركة الجوف', '+967 781 111 222', 'المركز، الجوف', 'aljawf'),
('a111', 'مؤسسة صعدة', '+967 782 222 333', 'حي المركز، صعدة', 'sadah'),
('a112', 'شركة عمران', '+967 783 333 444', 'المركز، عمران', 'amran'),
('a113', 'مؤسسة ذمار', '+967 784 444 555', 'المركز، ذمار', 'dhamar'),
('a114', 'شركة الحديدة', '+967 785 555 666', 'المركز، الحديدة', 'alhodiedah'),
('a115', 'مؤسسة لحج', '+967 786 666 777', 'المركز، لحج', 'lahij'),
('a116', 'شركة أبين', '+967 777 888 999', 'المركز، أبين', 'abin'),
('a117', 'مؤسسة شبوة', '+967 788 888 999', 'المركز، شبوة', 'shabwah'),
('a118', 'شركة المهرة', '+967 789 999 000', 'المركز، المهرة', 'almahrah'),
('a119', 'مؤسسة ريمة', '+967 781 222 444', 'المركز، ريمة', 'raymah'),
('a120', 'شركة المحويت', '+967 782 333 555', 'المركز، المحويت', 'almuhawit'),
('a121', 'مؤسسة حجة', '+967 783 444 666', 'المركز، حجة', 'hajjah'),
('a122', 'شركة سقطرى', '+967 784 555 777', 'المركز، سقطرى', 'socotra')
ON CONFLICT (id) DO NOTHING;

INSERT INTO banners (id, title, subtitle, cta, link, image, active) VALUES
('bn1', 'مواسير رويال PVC-U... الجودة بكل المقاييس', 'مصنع الأنوار للبلاستيك.', 'اكتشف المنتجات', '#products/plumbing', '/images/hero-pipes.jpg', true),
('bn2', 'شبكات الري والزراعة الحديثة', 'أنابيب تنقيط، مرشات، مضخات.', 'تصفح مواد الزراعة', '#products/agriculture', '/images/agriculture-irrigation.jpg', true),
('bn3', 'ختم الجودة من رويال', 'ALANWAR GUARANTEE SINCE 1982', 'تعرف على مصنعنا', '#about', '/images/factory-production.jpg', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO settings (key, value) VALUES ('general', '{"productName":"مصنع رويال للأنابيب ومستلزماتها","tagline":"Royal Factory","managerName":"رمزي القحطاني - مسؤول المبيعات","salesPhone":"782002220","accountsPhone":"782002225","inquiryPhone":"782002229","deliveryPhone":"784414445","whatsapp":"+967 782 002 220","email":"info@royal-pipes.com","address":"مصنع الأنوار للبلاستيك - رويال"}')
ON CONFLICT (key) DO NOTHING;

─────── إلى هنا ───────

7. اضغط "Run" ✅
8. اذهب إلى: Settings (⚙️) → API
9. انسخ: **Project URL** و **anon/public key**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 الخطوة 2: رفع الموقع (3 دقائق) - Netlify
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. افتح: https://app.netlify.com/drop
2. سجّل دخول (Google/GitHub - مجاني)
3. اسحب مجلد **dist/** وأفلته في الصفحة
4. ✅ الموقع الآن على الإنترنت!
5. لتغيير الاسم: Site settings → Change site name → royal-pipes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 الخطوة 3: ربط السحابة (دقيقة واحدة) - من لوحة التحكم
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. افتح موقعك الجديد على Netlify
2. اضغط "لوحة التحكم" (أو /admin)
3. سجّل دخول: admin / royal2026
4. اذهب إلى "الإعدادات"
5. في قسم "الاستضافة السحابية":
   • الصق Project URL
   • الصق anon key
6. اضغط "اختبار الاتصال"
7. ✅ تم! المنتجات من السحابة تظهر للجميع!

══════════════════════════════════════════════════════════════════════
📊 النتيجة النهائية:
══════════════════════════════════════════════════════════════════════

مدير الموقع (رمزي القحطاني)
       ↓ يضيف منتج من لوحة التحكم
    Supabase (قاعدة بيانات سحابية)
       ↓ Realtime Update (خلال ثوانٍ!)
  جميع العملاء في أنحاء اليمن 🇾🇪
  يرون المنتج الجديد على الموقع!

══════════════════════════════════════════════════════════════════════
 معلومات التواصل:
══════════════════════════════════════════════════════════════════════

  رمزي القحطاني - مسؤول المبيعات
  📞 المبيعات:      782002220
  🧮 الحسابات:      782002225
  📞 الاستفسار:     782002229
  🚚 التوصيل:       784414445
  💬 واتساب:        +967 782 002 220

══════════════════════════════════════════════════════════════════════
🔐 أمان الموقع:
══════════════════════════════════════════════════════════════════════

  • Supabase مجاني حتى 500MB بيانات
  • Netlify مجاني مع شهادة SSL (HTTPS)
  • لوحة التحكم محمية بكلمة مرور
  • البيانات مشفرة وآمنة

══════════════════════════════════════════════════════════════════════
