// ═══════════════════════════════════════════════════════════
//  📦 مخزن البيانات - Royal Pipes & Accessories (Sync)
// ═══════════════════════════════════════════════════════════
//
//  يعمل مع localStorage حالياً
//  للربط بـ Supabase انظر دليل الاستضافة في الأسفل

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  subcategories: { id: string; name: string }[];
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  featured?: boolean;
  createdAt: number;
};

export type Agent = {
  id: string;
  name: string;
  phone: string;
  address: string;
  governorateId: string;
  logo?: string;
  createdAt: number;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  image: string;
  active: boolean;
  expiresAt?: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: number;
};

export type Settings = {
  productName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  aboutVideo: string;
  mapsEmbed: string;
  managerName: string;
  salesPhone: string;
  accountsPhone: string;
  inquiryPhone: string;
  deliveryPhone: string;
};

export type Stats = { products: number; agents: number; messages: number };

export type Store = {
  categories: Category[];
  products: Product[];
  agents: Agent[];
  banners: Banner[];
  messages: Message[];
  settings: Settings;
};

const KEY = "royal_site_v3";

export const GOVERNORATES = [
  { id: "sanaa", name: "صنعاء" },
  { id: "aden", name: "عدن" },
  { id: "taiz", name: "تعز" },
  { id: "hadrmut", name: "حضرموت" },
  { id: "ibb", name: "إب" },
  { id: "aldhala", name: "الضالع" },
  { id: "albayda", name: "البيضاء" },
  { id: "marib", name: "مأرب" },
  { id: "aljawf", name: "الجوف" },
  { id: "sadah", name: "صعدة" },
  { id: "amran", name: "عمران" },
  { id: "dhamar", name: "ذمار" },
  { id: "alhodiedah", name: "الحديدة" },
  { id: "lahij", name: "لحج" },
  { id: "abin", name: "أبين" },
  { id: "shabwah", name: "شبوة" },
  { id: "almahrah", name: "المهرة" },
  { id: "raymah", name: "ريمة" },
  { id: "almuhawit", name: "المحويت" },
  { id: "hajjah", name: "حجة" },
  { id: "socotra", name: "سقطرى" },
];

const seed: Store = {
  settings: {
    productName: "مصنع رويال للأنابيب ومستلزماتها",
    tagline: "Royal Factory for Pipes & Accessories",
    phone: "+967 782 002 229",
    whatsapp: "+967 782 002 220",
    email: "info@royal-pipes.com",
    address: "مصنع الأنوار للبلاستيك - رويال",
    facebook: "https://facebook.com/royal-pipes-yemen",
    instagram: "https://instagram.com/royal_pipes",
    youtube: "",
    aboutVideo: "",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14896.1234567890!2d44.19!3d15.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NMKwMDAnMzcuMCJF!5e0!3m2!1sar!2s!4v1700000000000",
    managerName: "رمزي القحطاني - مسؤول المبيعات",
    salesPhone: "782002220",
    accountsPhone: "782002225",
    inquiryPhone: "782002229",
    deliveryPhone: "784414445",
  },
  categories: [
    { id: "plumbing", name: "أنظمة السباكة", icon: "fa-solid fa-faucet-drip", color: "from-blue-500 to-blue-700", description: "مواسير ووصلات PVC-U و PE عالية الجودة لجميع أنظمة المياه والصرف", subcategories: [
      { id: "pvc-pipes", name: "مواسير PVC-U" }, { id: "pe-pipes", name: "مواسير PE" }, { id: "fittings", name: "وصولات وكواع" }, { id: "valves", name: "محابس وصمامات" }, { id: "tanks", name: "خزانات المياه" }, { id: "drainage", name: "شبكات الصرف" },
    ]},
    { id: "agriculture", name: "مواد الزراعة", icon: "fa-solid fa-seedling", color: "from-green-500 to-emerald-700", description: "شبكات ري كاملة وأنابيب التنقيط والرش والمضخات للزراعة الحديثة", subcategories: [
      { id: "drip-irrigation", name: "شبكات الري بالتنقيط" }, { id: "irrigation-pipes", name: "مواسير الري" }, { id: "hoses", name: "خراطيم مرنة" }, { id: "sprinklers", name: "مرشات رشاشات" }, { id: "filters", name: "فلاتر ومضخات" }, { id: "control-valves", name: "صمامات تحكم" },
    ]},
    { id: "electrical", name: "الكهرباء", icon: "fa-solid fa-bolt", color: "from-amber-500 to-orange-600", description: "أسلاك وكابلات NYM ونظام حماية وتوزيع الكهرباء", subcategories: [
      { id: "cables", name: "أسلاك وكابلات NYM" }, { id: "switches", name: "مفاتيح وقوابض" }, { id: "lights", name: "لمبات وإضاءة LED" }, { id: "panels", name: "لوحات توزيع وقواطع" }, { id: "meters", name: "عدادات وقياس" }, { id: "conduits", name: "أنابيب حماية" },
    ]},
    { id: "building", name: "مواد البناء", icon: "fa-solid fa-warehouse", color: "from-stone-500 to-zinc-700", description: "حديد تسليح، أسمنت، رمل، طابوق، مواد عازلة، دهانات", subcategories: [
      { id: "rebar", name: "حديد تسليح" }, { id: "cement", name: "أسمنت" }, { id: "sand", name: "رمل وزلط" }, { id: "brick", name: "طابوق وبلوك" }, { id: "insulation", name: "مواد عازلة" }, { id: "paint", name: "دهانات وتشطيبات" }, { id: "tools", name: "أدوات بناء" },
    ]},
  ],
  products: [
    { id: "p1", name: "ماسورة PVC-U أبيض 20ملم (½ بوصة)", categoryId: "plumbing", subcategoryId: "pvc-pipes", price: 85, currency: "ريال", description: "ماسورة PVC-U أبيض اللون، قطر 20 ملم (½ بوصة)، ضغط 10 بار، طول 3 متر. مصنعة وفق المواصفات القياسية الألمانية والأمريكية.", image: "/images/hero-pipes.jpg", featured: true, createdAt: Date.now() - 100000 },
    { id: "p2", name: "ماسورة PVC-U أبيض 25ملم (¾ بوصة)", categoryId: "plumbing", subcategoryId: "pvc-pipes", price: 120, currency: "ريال", description: "ماسورة PVC-U أبيض، قطر 25 ملم (¾ بوصة)، ضغط 10 بار، طول 3 متر.", image: "/images/hero-pipes.jpg", featured: false, createdAt: Date.now() - 99000 },
    { id: "p3", name: "ماسورة PVC-U أبيض 110ملم (4 بوصة)", categoryId: "plumbing", subcategoryId: "pvc-pipes", price: 1100, currency: "ريال", description: "ماسورة PVC-U أبيض، قطر 110 ملم (4 بوصة)، ضغط 6 بار، طول 3 متر. مناسبة لشبكات الصرف الصحي.", image: "/images/hero-pipes.jpg", featured: true, createdAt: Date.now() - 98000 },
    { id: "p4", name: "ماسورة PE للري 32ملم (ضغط 6 بار) - 100 متر", categoryId: "agriculture", subcategoryId: "irrigation-pipes", price: 380, currency: "ريال", description: "ماسورة PE أسود للري، قطر 32 ملم، ضغط 6 بار، ملف 100 متر.", image: "/images/agriculture-irrigation.jpg", featured: true, createdAt: Date.now() - 97000 },
    { id: "p5", name: "أنبوب تنقيط 16ملم (طول 1000 متر)", categoryId: "agriculture", subcategoryId: "drip-irrigation", price: 1800, currency: "ريال", description: "أنبوب تنقيط PE أسود، قطر 16 ملم، طول 1000 متر. يحتوي على نقاط تنقيط مدمجة كل 30 سم.", image: "/images/agriculture-irrigation.jpg", featured: true, createdAt: Date.now() - 96000 },
    { id: "p6", name: "سلك NYM 3×1.5 ملم (100 متر)", categoryId: "electrical", subcategoryId: "cables", price: 850, currency: "ريال", description: "سلك كهرباء نوع NYM، 3 أسلاك × 1.5 ملم مربع، معزول، لون رمادي.", image: "/images/electrical-cables.jpg", featured: true, createdAt: Date.now() - 95000 },
    { id: "p7", name: "حديد تسليح 10ملم (12 متر)", categoryId: "building", subcategoryId: "rebar", price: 180, currency: "ريال", description: "حديد تسليح رصاصي (ريبارة) قطر 10 ملم، طول 12 متر.", image: "/images/building-materials.jpg", featured: true, createdAt: Date.now() - 94000 },
    { id: "p8", name: "أسمنت بورتلاندي 50كغ", categoryId: "building", subcategoryId: "cement", price: 180, currency: "ريال", description: "كيس أسمنت بورتلاندي نوع I، 50 كيلوجرام.", image: "/images/building-materials.jpg", featured: true, createdAt: Date.now() - 93000 },
    { id: "p9", name: "دهان أكريليك أبيض مطفي (18 لتر)", categoryId: "building", subcategoryId: "paint", price: 1450, currency: "ريال", description: "دهان أكريليك مطفي أبيض، دلو 18 لتر.", image: "/images/building-materials.jpg", featured: true, createdAt: Date.now() - 92000 },
    { id: "p10", name: "حبس كروي (Ball Valve) PVC - ½ بوصة", categoryId: "plumbing", subcategoryId: "valves", price: 120, currency: "ريال", description: "حبس كروي PVC-U (Ball Valve) نصف بوصة، مقاومة عالية.", image: "/images/pvc-fittings.jpg", featured: true, createdAt: Date.now() - 91000 },
    { id: "p11", name: "مرشة دوار (Sprinkler) - صغيرة", categoryId: "agriculture", subcategoryId: "sprinklers", price: 180, currency: "ريال", description: "مرشة ري دوار صغيرة، مدى رش 8-12 متر.", image: "/images/agriculture-irrigation.jpg", featured: true, createdAt: Date.now() - 90000 },
    { id: "p12", name: "لمبة LED 9 واط (أبيض بارد)", categoryId: "electrical", subcategoryId: "lights", price: 75, currency: "ريال", description: "لمبة LED موفرة للطاقة 9 واط، لون ضوء أبيض بارد.", image: "/images/electrical-cables.jpg", featured: true, createdAt: Date.now() - 89000 },
  ],
  agents: [
    { id: "a101", name: "مؤسسة النور للتجارة", phone: "+967 771 234 567", address: "شارع الزبيري، صنعاء", governorateId: "sanaa", createdAt: Date.now() },
    { id: "a102", name: "شركة الكبير للمواد", phone: "+967 772 345 678", address: "حي الحدادة، صنعاء", governorateId: "sanaa", createdAt: Date.now() },
    { id: "a103", name: "مؤسسة عدن للسباكة", phone: "+967 773 456 789", address: "حي المعلا، عدن", governorateId: "aden", createdAt: Date.now() },
    { id: "a104", name: "شركة تعز التجارية", phone: "+967 774 567 890", address: "حي الجحملية، تعز", governorateId: "taiz", createdAt: Date.now() },
    { id: "a105", name: "مؤسسة حضرموت", phone: "+967 775 678 901", address: "حي المنصورة، المكلا", governorateId: "hadrmut", createdAt: Date.now() },
    { id: "a106", name: "شركة إب للكهرباء", phone: "+967 776 789 012", address: "حي المركز، إب", governorateId: "ibb", createdAt: Date.now() },
    { id: "a107", name: "مؤسسة الضالع", phone: "+967 777 890 123", address: "المركز، الضالع", governorateId: "aldhala", createdAt: Date.now() },
    { id: "a108", name: "شركة البيضاء", phone: "+967 778 901 234", address: "المركز، البيضاء", governorateId: "albayda", createdAt: Date.now() },
    { id: "a109", name: "مؤسسة مأرب", phone: "+967 779 012 345", address: "المركز، مأرب", governorateId: "marib", createdAt: Date.now() },
    { id: "a110", name: "شركة الجوف", phone: "+967 781 111 222", address: "المركز، الجوف", governorateId: "aljawf", createdAt: Date.now() },
    { id: "a111", name: "مؤسسة صعدة", phone: "+967 782 222 333", address: "حي المركز، صعدة", governorateId: "sadah", createdAt: Date.now() },
    { id: "a112", name: "شركة عمران", phone: "+967 783 333 444", address: "المركز، عمران", governorateId: "amran", createdAt: Date.now() },
    { id: "a113", name: "مؤسسة ذمار", phone: "+967 784 444 555", address: "المركز، ذمار", governorateId: "dhamar", createdAt: Date.now() },
    { id: "a114", name: "شركة الحديدة", phone: "+967 785 555 666", address: "المركز، الحديدة", governorateId: "alhodiedah", createdAt: Date.now() },
    { id: "a115", name: "مؤسسة لحج", phone: "+967 786 666 777", address: "المركز، لحج", governorateId: "lahij", createdAt: Date.now() },
    { id: "a116", name: "شركة أبين", phone: "+967 787 777 888", address: "المركز، أبين", governorateId: "abin", createdAt: Date.now() },
    { id: "a117", name: "مؤسسة شبوة", phone: "+967 788 888 999", address: "المركز، شبوة", governorateId: "shabwah", createdAt: Date.now() },
    { id: "a118", name: "شركة المهرة", phone: "+967 789 999 000", address: "المركز، المهرة", governorateId: "almahrah", createdAt: Date.now() },
    { id: "a119", name: "مؤسسة ريمة", phone: "+967 781 222 444", address: "المركز، ريمة", governorateId: "raymah", createdAt: Date.now() },
    { id: "a120", name: "شركة المحويت", phone: "+967 782 333 555", address: "المركز، المحويت", governorateId: "almuhawit", createdAt: Date.now() },
    { id: "a121", name: "مؤسسة حجة", phone: "+967 783 444 666", address: "المركز، حجة", governorateId: "hajjah", createdAt: Date.now() },
    { id: "a122", name: "شركة سقطرى", phone: "+967 784 555 777", address: "المركز، سقطرى", governorateId: "socotra", createdAt: Date.now() },
  ],
  banners: [
    { id: "bn1", title: "مواسير رويال PVC-U... الجودة بكل المقاييس", subtitle: "مصنع الأنوار للبلاستيك ينتج مواسير ووصلات PVC-U وفق المواصفات القياسية العالمية.", cta: "اكتشف المنتجات", link: "#products/plumbing", image: "/images/hero-pipes.jpg", active: true },
    { id: "bn2", title: "شبكات الري والزراعة الحديثة", subtitle: "أنابيب تنقيط، مرشات، مضخات، وفلاتر - كل ما تحتاجه لمشروعك الزراعي.", cta: "تصفح مواد الزراعة", link: "#products/agriculture", image: "/images/agriculture-irrigation.jpg", active: true },
    { id: "bn3", title: "ختم الجودة من رويال", subtitle: "ALANWAR GUARANTEE SINCE 1982 - أكثر من 40 سنة من الخبرة.", cta: "تعرف على مصنعنا", link: "#about", image: "/images/factory-production.jpg", active: true },
  ],
  messages: [],
};

let cache: Store | null = null;

function load(): Store {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { cache = JSON.parse(raw); return cache!; }
  } catch {}
  cache = JSON.parse(JSON.stringify(seed));
  save(cache!);
  return cache!;
}

function save(s: Store) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function getStore(): Store { return load(); }
export function resetStore() { localStorage.removeItem(KEY); cache = JSON.parse(JSON.stringify(seed)); save(cache!); }

export const actions = {
  addProduct(p: Omit<Product, "id" | "createdAt">) { const s = load(); s.products.unshift({ ...p, id: "p" + Date.now(), createdAt: Date.now() }); save(s); },
  updateProduct(id: string, patch: Partial<Product>) { const s = load(); s.products = s.products.map((p) => p.id === id ? { ...p, ...patch } : p); save(s); },
  deleteProduct(id: string) { const s = load(); s.products = s.products.filter((p) => p.id !== id); save(s); },
  addAgent(a: Omit<Agent, "id" | "createdAt">) { const s = load(); s.agents.unshift({ ...a, id: "ag" + Date.now(), createdAt: Date.now() }); save(s); },
  updateAgent(id: string, patch: Partial<Agent>) { const s = load(); s.agents = s.agents.map((a) => a.id === id ? { ...a, ...patch } : a); save(s); },
  deleteAgent(id: string) { const s = load(); s.agents = s.agents.filter((a) => a.id !== id); save(s); },
  addBanner(b: Omit<Banner, "id">) { const s = load(); s.banners.unshift({ ...b, id: "bn" + Date.now() }); save(s); },
  updateBanner(id: string, patch: Partial<Banner>) { const s = load(); s.banners = s.banners.map((b) => b.id === id ? { ...b, ...patch } : b); save(s); },
  deleteBanner(id: string) { const s = load(); s.banners = s.banners.filter((b) => b.id !== id); save(s); },
  addMessage(m: Omit<Message, "id" | "read" | "createdAt">) { const s = load(); const msg: Message = { ...m, id: "m" + Date.now(), read: false, createdAt: Date.now() }; s.messages.unshift(msg); save(s); return msg; },
  markRead(id: string, read = true) { const s = load(); s.messages = s.messages.map((m) => m.id === id ? { ...m, read } : m); save(s); },
  deleteMessage(id: string) { const s = load(); s.messages = s.messages.filter((m) => m.id !== id); save(s); },
  updateSettings(patch: Partial<Settings>) { const s = load(); s.settings = { ...s.settings, ...patch }; save(s); },
  addCategory(c: Omit<Category, "id">) { const s = load(); s.categories.push({ ...c, id: "c" + Date.now() }); save(s); },
  updateCategory(id: string, patch: Partial<Category>) { const s = load(); s.categories = s.categories.map((c) => c.id === id ? { ...c, ...patch } : c); save(s); },
  deleteCategory(id: string) { const s = load(); s.categories = s.categories.filter((c) => c.id !== id); save(s); },
  getStats(): Stats { const s = load(); return { products: s.products.length, agents: s.agents.length, messages: s.messages.length }; },
};
