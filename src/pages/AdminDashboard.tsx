import { useEffect, useState } from "react";
import { actions, getStore, type Product, type Agent, type Banner, GOVERNORATES } from "../data/store";
import { cloudActions } from "../App";
import { useRouter } from "../router";
import { Package, Users, Image as ImageIcon, MessageSquare, Settings as SettingsIcon, LogOut, Plus, Edit3, Trash2, Eye, EyeOff, CheckCircle2, X, Crown, FolderTree, BarChart3, Mail, Phone, Cloud, CloudOff, RefreshCw, Link } from "lucide-react";

type Tab = "stats" | "products" | "agents" | "banners" | "categories" | "messages" | "settings";
const db = cloudActions;

export function AdminDashboard({ cloudReady }: { cloudReady?: boolean }) {
  const { navigate } = useRouter();
  const [tab, setTab] = useState<Tab>("stats");
  const [authChecked, setAuthChecked] = useState(false);
  const [isCloud, setIsCloud] = useState(cloudReady || false);

  useEffect(() => {
    if (sessionStorage.getItem("royal_admin") !== "1") { navigate({ name: "admin-login" }); }
    else { setAuthChecked(true); setIsCloud(cloudActions.isCloudConnected()); }
  }, [navigate, cloudReady]);

  if (!authChecked) return null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "stats", label: "الإحصائيات", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "products", label: "المنتجات", icon: <Package className="w-4 h-4" /> },
    { id: "categories", label: "الأقسام", icon: <FolderTree className="w-4 h-4" /> },
    { id: "agents", label: "نقاط البيع", icon: <Users className="w-4 h-4" /> },
    { id: "banners", label: "البنرات", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "messages", label: "الرسائل", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "settings", label: "الإعدادات", icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-silver-50">
      <div className="bg-royal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-gradient flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold">لوحة تحكم رويال</div>
              <div className="text-xs text-royal-200 flex items-center gap-2">
                {isCloud ? <span className="text-green-300 flex items-center gap-1"><Cloud className="w-3 h-3" /> متصل بالسحابة</span> : <span className="text-amber-300 flex items-center gap-1"><CloudOff className="w-3 h-3" /> تخزين محلي</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="#/" className="hidden sm:inline-flex px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold items-center"><Eye className="w-4 h-4 ml-1" /> الموقع</a>
            <button onClick={() => { sessionStorage.removeItem("royal_admin"); navigate({ name: "admin-login" }); }} className="px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-100 text-sm font-bold flex items-center"><LogOut className="w-4 h-4 ml-1" /> خروج</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <aside className="bg-white rounded-2xl border border-silver-200 p-2 h-fit lg:sticky lg:top-4">
            <div className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 lg:w-full px-3 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${tab === t.id ? "bg-royal-600 text-white shadow-md" : "text-silver-700 hover:bg-royal-50"}`}>
                  {t.icon}{t.label}
                </button>
              ))}
            </div>
          </aside>
          <main>
            {tab === "stats" && <StatsPanel />}
            {tab === "products" && <ProductsPanel />}
            {tab === "categories" && <CategoriesPanel />}
            {tab === "agents" && <AgentsPanel />}
            {tab === "banners" && <BannersPanel />}
            {tab === "messages" && <MessagesPanel />}
            {tab === "settings" && <SettingsPanel />}
          </main>
        </div>
      </div>
    </div>
  );
}

function StatsPanel() {
  const stats = actions.getStats();
  const store = getStore();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-royal-900">نظرة عامة</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Package className="w-7 h-7" />, label: "المنتجات", value: stats.products, color: "from-blue-500 to-blue-700" },
          { icon: <Users className="w-7 h-7" />, label: "نقاط البيع", value: stats.agents, color: "from-emerald-500 to-emerald-700" },
          { icon: <MessageSquare className="w-7 h-7" />, label: "الرسائل", value: stats.messages, color: "from-amber-500 to-orange-600" },
          { icon: <FolderTree className="w-7 h-7" />, label: "الأقسام", value: store.categories.length, color: "from-purple-500 to-purple-700" },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-silver-200 p-5 hover:shadow-xl transition">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center mb-3`}>{c.icon}</div>
            <div className="text-3xl font-extrabold text-royal-900">{c.value}</div>
            <div className="text-xs text-silver-500 mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-silver-200 px-5 py-3 flex justify-between items-center">
          <h3 className="font-extrabold text-royal-900">{title}</h3>
          <button onClick={onClose} className="text-silver-500 hover:text-red-500"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ProductsPanel() {
  const [products, setProducts] = useState<Product[]>(getStore().products);
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const cats = getStore().categories;
  const reload = () => setProducts(getStore().products);
  const remove = async (id: string) => { if (confirm("حذف المنتج؟")) { await db.deleteProduct(id); reload(); } };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl lg:text-2xl font-extrabold text-royal-900">إدارة المنتجات</h2>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="px-4 py-2 rounded-lg bg-royal-600 text-white text-sm font-bold hover:bg-royal-700 flex items-center gap-1"><Plus className="w-4 h-4" /> إضافة منتج</button>
      </div>
      <div className="bg-white rounded-2xl border border-silver-200 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
          {products.map((p) => {
            const cat = cats.find((c) => c.id === p.categoryId);
            return (
              <div key={p.id} className="bg-silver-50 rounded-xl border border-silver-200 p-3 hover:shadow-md transition">
                <img src={p.image || ""} alt={p.name} className="w-full h-24 object-cover rounded-lg bg-white mb-2" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                <h4 className="font-bold text-royal-900 text-xs line-clamp-1">{p.name}</h4>
                <div className="text-[10px] text-silver-500 flex items-center gap-1 mt-1"><i className={`${cat?.icon || ""} text-royal-500`} />{cat?.name}</div>
                <div className="flex gap-1 mt-2">
                  <button onClick={() => { setEditing(p); setOpen(true); }} className="flex-1 p-1.5 rounded-lg bg-royal-50 text-royal-700 hover:bg-royal-100 text-xs"><Edit3 className="w-3.5 h-3.5 inline" /></button>
                  <button onClick={() => remove(p.id)} className="flex-1 p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs"><Trash2 className="w-3.5 h-3.5 inline" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {open && <ProductForm initial={editing} onClose={() => setOpen(false)} onSaved={async () => { await new Promise(r => setTimeout(r, 500)); reload(); setOpen(false); }} />}
    </div>
  );
}

function ProductForm({ initial, onClose, onSaved }: { initial: Product | null; onClose: () => void; onSaved: () => void }) {
  const cats = getStore().categories;
  const [form, setForm] = useState({
    name: initial?.name || "",
    categoryId: initial?.categoryId || cats[0]?.id || "plumbing",
    subcategoryId: initial?.subcategoryId || cats[0]?.subcategories[0]?.id || "",
    price: initial?.price ?? 0,
    currency: initial?.currency || "ريال",
    description: initial?.description || "",
    image: initial?.image || "",
    featured: initial?.featured || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onCat = (id: string) => { const cat = cats.find((c) => c.id === id); setForm((f) => ({ ...f, categoryId: id, subcategoryId: cat?.subcategories[0]?.id || "" })); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("اسم المنتج مطلوب"); return; }
    setSaving(true); setError("");
    try {
      const productData = {
        name: form.name,
        categoryId: form.categoryId,
        subcategoryId: form.subcategoryId,
        price: form.price,
        currency: form.currency,
        description: form.description,
        image: form.image,
        featured: form.featured,
      };
      if (initial) { await db.updateProduct(initial.id, productData, form.image); }
      else { await db.addProduct(productData, form.image); }
      onSaved();
    } catch (err) {
      setError("خطأ في الحفظ");
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <Modal title={initial ? "تعديل منتج" : "إضافة منتج جديد"} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-silver-700 mb-1">اسم المنتج *</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white" placeholder="مثال: ماسورة PVC 50 ملم" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-silver-700 mb-1">الفئة</label>
            <select value={form.categoryId} onChange={(e) => onCat(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white">
              {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-silver-700 mb-1">التصنيف</label>
            <select value={form.subcategoryId} onChange={(e) => setForm({ ...form, subcategoryId: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white">
              {cats.find((c) => c.id === form.categoryId)?.subcategories.map((sc) => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-silver-700 mb-1">الوصف</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white resize-none" placeholder="وصف مختصر للمنتج..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-silver-700 mb-1">
            <Link className="w-3.5 h-3.5 inline ml-1" /> رابط الصورة (URL)
          </label>
          <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white" dir="ltr" />
          <div className="flex items-center gap-2 mt-2">
            {form.image ? (
              <img src={form.image} alt="preview" className="w-14 h-14 rounded-lg object-cover bg-white border border-silver-200" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-silver-100 flex items-center justify-center text-silver-400"><i className="fa-solid fa-image" /></div>
            )}
            <span className="text-[10px] text-silver-500">استخدم رابط صورة مباشر (jpg, png)</span>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-royal-600" />
          <span className="text-sm text-silver-700">منتج مميز (يظهر أولاً)</span>
        </label>
        {error && <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>}
        <div className="flex gap-2 pt-2">
          <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg bg-royal-600 text-white text-sm font-bold hover:bg-royal-700 disabled:opacity-50 flex items-center justify-center gap-1">
            {saving ? <><RefreshCw className="w-4 h-4 animate-spin" /> جاري الحفظ...</> : <><CheckCircle2 className="w-4 h-4" /> حفظ المنتج</>}
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg bg-silver-100 text-silver-700 text-sm font-bold hover:bg-silver-200">إلغاء</button>
        </div>
      </form>
    </Modal>
  );
}

function CategoriesPanel() {
  const cats = getStore().categories;
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-extrabold text-royal-900 mb-4">الأقسام والتصنيفات</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {cats.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-silver-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center text-xl`}><i className={c.icon} /></div>
              <div><h3 className="font-bold text-royal-900">{c.name}</h3><div className="text-xs text-silver-500">{c.subcategories.length} تصنيف</div></div>
            </div>
            <div className="flex flex-wrap gap-1.5">{c.subcategories.map((sc) => <span key={sc.id} className="px-2 py-1 rounded-md bg-silver-100 text-xs text-silver-700">{sc.name}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentsPanel() {
  const [agents, setAgents] = useState<Agent[]>(getStore().agents);
  const [editing, setEditing] = useState<Agent | null>(null);
  const [open, setOpen] = useState(false);
  const reload = () => setAgents(getStore().agents);
  const remove = async (id: string) => { if (confirm("حذف نقطة البيع؟")) { await db.deleteAgent(id); reload(); } };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl lg:text-2xl font-extrabold text-royal-900">إدارة نقاط البيع</h2>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="px-4 py-2 rounded-lg bg-royal-600 text-white text-sm font-bold hover:bg-royal-700 flex items-center gap-1"><Plus className="w-4 h-4" /> إضافة نقطة بيع</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((a) => (
          <div key={a.id} className="bg-white rounded-xl border border-silver-200 p-4 hover:shadow-md transition">
            <h4 className="font-bold text-royal-900 text-sm">{a.name}</h4>
            <div className="text-xs text-silver-500 mt-1">{GOVERNORATES.find((g) => g.id === a.governorateId)?.name || "-"}</div>
            <div className="text-xs text-royal-600 mt-1" dir="ltr">{a.phone}</div>
            <div className="flex gap-1 mt-2">
              <button onClick={() => { setEditing(a); setOpen(true); }} className="flex-1 p-1.5 rounded-lg bg-royal-50 text-royal-700 hover:bg-royal-100 text-xs"><Edit3 className="w-3.5 h-3.5 inline" /></button>
              <button onClick={() => remove(a.id)} className="flex-1 p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs"><Trash2 className="w-3.5 h-3.5 inline" /></button>
            </div>
          </div>
        ))}
      </div>
      {open && <AgentForm initial={editing} onClose={() => setOpen(false)} onSaved={async () => { await new Promise(r => setTimeout(r, 500)); reload(); setOpen(false); }} />}
    </div>
  );
}

function AgentForm({ initial, onClose, onSaved }: { initial: Agent | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ name: initial?.name || "", phone: initial?.phone || "", address: initial?.address || "", governorateId: initial?.governorateId || GOVERNORATES[0].id });
  const submit = async (e: React.FormEvent) => { e.preventDefault(); if (!form.name.trim()) return alert("الاسم مطلوب"); if (initial) { await db.updateAgent(initial.id, form); } else { await db.addAgent(form); } onSaved(); };
  return (
    <Modal title={initial ? "تعديل نقطة بيع" : "إضافة نقطة بيع"} onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <div><label className="block text-xs font-bold text-silver-700 mb-1">الاسم *</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white" /></div>
        <div><label className="block text-xs font-bold text-silver-700 mb-1">المحافظة</label><select value={form.governorateId} onChange={(e) => setForm({ ...form, governorateId: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white">{GOVERNORATES.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}</select></div>
        <div><label className="block text-xs font-bold text-silver-700 mb-1">الهاتف</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white" dir="ltr" /></div>
        <div><label className="block text-xs font-bold text-silver-700 mb-1">العنوان</label><input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white" /></div>
        <div className="flex gap-2 pt-2"><button type="submit" className="flex-1 py-2.5 rounded-lg bg-royal-600 text-white text-sm font-bold hover:bg-royal-700">حفظ</button><button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg bg-silver-100 text-silver-700 text-sm font-bold">إلغاء</button></div>
      </form>
    </Modal>
  );
}

function BannersPanel() {
  const [banners, setBanners] = useState<Banner[]>(getStore().banners);
  const reload = () => setBanners(getStore().banners);
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-extrabold text-royal-900 mb-4">إدارة البنرات</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {banners.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border border-silver-200 overflow-hidden">
            <img src={b.image} alt={b.title} className="w-full h-28 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-royal-900 text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-silver-500 line-clamp-2 mb-3">{b.subtitle}</p>
              <div className="flex gap-2">
                <button onClick={async () => { await db.updateBanner(b.id, { active: !b.active }); reload(); }} className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold ${b.active ? "bg-green-50 text-green-700" : "bg-silver-100 text-silver-600"}`}>
                  {b.active ? <><CheckCircle2 className="w-3.5 h-3.5 inline ml-1" /> مفعّل</> : <><EyeOff className="w-3.5 h-3.5 inline ml-1" /> معطّل</>}
                </button>
                <button onClick={async () => { if (confirm("حذف؟")) { await db.deleteBanner(b.id); reload(); } }} className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-bold"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState(getStore().messages);
  const reload = () => setMessages(getStore().messages);
  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-extrabold text-royal-900 mb-4">صندوق الرسائل</h2>
      {messages.length === 0 ? <div className="bg-white rounded-2xl border border-silver-200 p-12 text-center"><i className="fa-solid fa-inbox text-6xl text-silver-300 mb-3" /><p className="text-silver-500">لا توجد رسائل</p></div> : (
        <div className="space-y-3">{messages.map((m) => (
          <div key={m.id} className={`bg-white rounded-2xl border p-4 ${m.read ? "border-silver-200" : "border-royal-300 bg-royal-50/30"}`}>
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <div><div className="flex items-center gap-2">{!m.read && <span className="w-2 h-2 rounded-full bg-royal-500" />}<h3 className="font-bold text-royal-900 text-sm">{m.subject}</h3></div>
                <div className="text-xs text-silver-500 mt-1 flex flex-wrap gap-x-3 gap-y-1"><span><Mail className="w-3 h-3 inline ml-1" />{m.email || "—"}</span><span dir="ltr"><Phone className="w-3 h-3 inline ml-1" />{m.phone || "—"}</span></div>
              </div>
              <div className="text-xs text-silver-400">{new Date(m.createdAt).toLocaleString("ar-YE")}</div>
            </div>
            <p className="text-sm text-silver-700 leading-relaxed mb-3">{m.message}</p>
            <div className="flex gap-2">
              {!m.read && <button onClick={async () => { await db.markRead(m.id, true); reload(); }} className="px-3 py-1.5 rounded-lg bg-royal-50 text-royal-700 text-xs font-bold"><CheckCircle2 className="w-3.5 h-3.5 inline ml-1" /> مقروء</button>}
              <button onClick={async () => { if (confirm("حذف؟")) { await db.deleteMessage(m.id); reload(); } }} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold mr-auto"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}</div>
      )}
    </div>
  );
}

function SettingsPanel() {
  const settings = getStore().settings;
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [sbUrl, setSbUrl] = useState(localStorage.getItem("royal_sb_url") || "");
  const [sbKey, setSbKey] = useState(localStorage.getItem("royal_sb_key") || "");
  const [sbConnected, setSbConnected] = useState(cloudActions.isCloudConnected());
  const [sbSaving, setSbSaving] = useState(false);
  const [sbMsg, setSbMsg] = useState("");

  const submit = async (e: React.FormEvent) => { e.preventDefault(); await db.updateSettings(form); setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const testSupabase = async () => {
    setSbSaving(true); setSbMsg("");
    if (!sbUrl.trim() || !sbKey.trim()) { setSbMsg("أدخل Project URL و anon key"); setSbSaving(false); return; }
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const client = createClient(sbUrl.trim(), sbKey.trim());
      const { error } = await client.from("products").select("id").limit(1);
      if (error) throw error;
      localStorage.setItem("royal_sb_url", sbUrl.trim());
      localStorage.setItem("royal_sb_key", sbKey.trim());
      setSbConnected(true);
      setSbMsg("✅ تم الاتصال! سيتم إعادة التحميل...");
      setTimeout(() => window.location.reload(), 1500);
    } catch (e: any) { setSbConnected(false); setSbMsg(" " + (e.message || "تحقق من المفاتيح")); }
    setSbSaving(false);
  };

  const clearCloud = () => { localStorage.removeItem("royal_sb_url"); localStorage.removeItem("royal_sb_key"); setSbUrl(""); setSbKey(""); setSbConnected(false); setSbMsg("تم إزالة الاتصال"); setTimeout(() => window.location.reload(), 1000); };

  const Field = ({ label, name, type = "text" }: { label: string; name: keyof typeof form; type?: string }) => (
    <div><label className="block text-xs font-bold text-silver-700 mb-1">{label}</label><input type={type} value={form[name] as string} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white" dir={["email", "aboutVideo", "mapsEmbed", "phone", "whatsapp", "salesPhone", "accountsPhone", "inquiryPhone", "deliveryPhone"].includes(name) ? "ltr" : "rtl"} /></div>
  );

  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-extrabold text-royal-900 mb-4">الإعدادات</h2>
      {saved && <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> تم الحفظ</div>}

      <div className="bg-white rounded-2xl border border-silver-200 p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sbConnected ? "bg-green-50 text-green-600" : "bg-silver-100 text-silver-500"}`}>{sbConnected ? <Cloud className="w-5 h-5" /> : <CloudOff className="w-5 h-5" />}</div>
          <div><h3 className="font-extrabold text-royal-900">الاستضافة السحابية</h3><div className="text-xs text-silver-500">{sbConnected ? "✅ متصل - المنتجات تنتشر للجميع" : "⭕ غير متصل - البيانات محلية"}</div></div>
        </div>
        <div className="space-y-3">
          <div><label className="block text-xs font-bold text-silver-700 mb-1">Project URL</label><input type="url" value={sbUrl} onChange={(e) => setSbUrl(e.target.value)} placeholder="https://xxxxx.supabase.co" className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white" dir="ltr" /></div>
          <div><label className="block text-xs font-bold text-silver-700 mb-1">anon / public key</label><input type="text" value={sbKey} onChange={(e) => setSbKey(e.target.value)} placeholder="eyJh..." className="w-full px-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm bg-white" dir="ltr" /></div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={testSupabase} disabled={sbSaving} className="px-4 py-2.5 rounded-lg bg-royal-600 text-white text-sm font-bold hover:bg-royal-700 disabled:opacity-50 flex items-center gap-1">{sbSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}{sbSaving ? "جاري..." : "اختبار الاتصال"}</button>
            {sbConnected && <button onClick={clearCloud} className="px-4 py-2.5 rounded-lg bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 flex items-center gap-1"><CloudOff className="w-4 h-4" /> إزالة</button>}
          </div>
          {sbMsg && <div className={`p-3 rounded-lg text-sm ${sbMsg.startsWith("✅") ? "bg-green-50 text-green-800" : sbMsg.startsWith("❌") ? "bg-red-50 text-red-700" : "bg-royal-50 text-royal-700"}`}>{sbMsg}</div>}
        </div>
      </div>

      <form onSubmit={submit} className="bg-white rounded-2xl border border-silver-200 p-5 space-y-3">
        <h3 className="font-bold text-royal-900">إعدادات الموقع</h3>
        <Field label="اسم الشركة" name="productName" />
        <Field label="الشعار الفرعي" name="tagline" />
        <Field label="اسم مسؤول المبيعات" name="managerName" />
        <div className="grid sm:grid-cols-2 gap-3"><Field label="المبيعات" name="salesPhone" /><Field label="الحسابات" name="accountsPhone" /></div>
        <div className="grid sm:grid-cols-2 gap-3"><Field label="الاستفسار" name="inquiryPhone" /><Field label="التوصيل" name="deliveryPhone" /></div>
        <div className="grid sm:grid-cols-2 gap-3"><Field label="الهاتف" name="phone" /><Field label="واتساب" name="whatsapp" /></div>
        <Field label="البريد" name="email" />
        <Field label="العنوان" name="address" />
        <div className="grid sm:grid-cols-3 gap-3"><Field label="فيسبوك" name="facebook" /><Field label="إنستغرام" name="instagram" /><Field label="يوتيوب" name="youtube" /></div>
        <button type="submit" className="px-6 py-2.5 rounded-lg bg-royal-600 text-white text-sm font-bold hover:bg-royal-700">حفظ الإعدادات</button>
      </form>
    </div>
  );
}
