import { useEffect, useState } from "react";
import { RouterProvider, useRouter } from "./router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { AgentsPage } from "./pages/AgentsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { getStore, actions, type Store, type Product, type Agent, type Banner, type Message } from "./data/store";

// ═══════════════════════════════════════════════════════════
//  ☁️ Supabase Cloud Integration
// ═══════════════════════════════════════════════════════════

let supabase: any = null;
let cloudConnected = false;
let initPromise: Promise<boolean> | null = null;

function getCloudKeys(): { url: string; key: string } {
  return {
    url: localStorage.getItem("royal_sb_url") || "",
    key: localStorage.getItem("royal_sb_key") || "",
  };
}

async function initSupabase(): Promise<boolean> {
  const { url, key } = getCloudKeys();
  if (!url || !key || cloudConnected) return cloudConnected;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      supabase = createClient(url, key);

      const { error } = await supabase.from("products").select("id").limit(1);
      if (error) { console.warn("Supabase init failed:", error.message); initPromise = null; return false; }

      cloudConnected = true;
      console.log("✅ Supabase متصل بنجاح!");

      // تحميل البيانات من السحابة
      const [prodRes, agentRes, bannerRes, msgRes, settingsRes] = await Promise.all([
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("agents").select("*").order("created_at", { ascending: false }),
        supabase.from("banners").select("*").order("created_at", { ascending: false }),
        supabase.from("messages").select("*").order("created_at", { ascending: false }),
        supabase.from("settings").select("*"),
      ]);

      if (prodRes.data?.length) {
        const store = getStore();
        store.products = prodRes.data.map((p: any) => ({
          id: p.id, name: p.name, categoryId: p.category_id,
          subcategoryId: p.subcategory_id, price: Number(p.price) || 0,
          currency: p.currency || "ريال", description: p.description || "",
          image: p.image || "", featured: !!p.featured, createdAt: p.created_at
        }));
      }
      if (agentRes.data?.length) {
        const store = getStore();
        store.agents = agentRes.data.map((a: any) => ({
          id: a.id, name: a.name, phone: a.phone || "",
          address: a.address || "", governorateId: a.governorate_id || "",
          logo: a.logo, createdAt: a.created_at
        }));
      }
      if (bannerRes.data?.length) {
        const store = getStore();
        store.banners = bannerRes.data.map((b: any) => ({
          id: b.id, title: b.title || "", subtitle: b.subtitle || "",
          cta: b.cta || "", link: b.link || "", image: b.image || "",
          active: b.active !== false
        }));
      }
      if (msgRes.data?.length) {
        const store = getStore();
        store.messages = msgRes.data.map((m: any) => ({
          id: m.id, name: m.name || "", email: m.email || "",
          phone: m.phone || "", subject: m.subject || "",
          message: m.message || "", read: !!m.read, createdAt: m.created_at
        }));
      }
      if (settingsRes.data?.length) {
        const general = settingsRes.data.find((s: any) => s.key === "general");
        if (general?.value) {
          const store = getStore();
          store.settings = { ...store.settings, ...(typeof general.value === 'string' ? JSON.parse(general.value) : general.value) };
        }
      }
      return true;
    } catch (e) {
      console.error("Supabase error:", e);
      initPromise = null;
      return false;
    }
  })();
  return initPromise;
}

function setupRealtime() {
  if (!supabase || !cloudConnected) return;
  const reload = () => setTimeout(() => window.location.reload(), 800);
  ["products", "agents", "banners", "messages", "settings"].forEach((table) => {
    supabase.channel(`rt_${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, reload)
      .subscribe();
  });
}

// ═══════════════════════════════════════════════════════════
//  Cloud Actions - ترسل البيانات للسحابة
// ═══════════════════════════════════════════════════════════

export const cloudActions = {
  async addProduct(p: Omit<Product, "id" | "createdAt">, imageUrl?: string) {
    // 1. حفظ محلي
    actions.addProduct(p);

    // 2. إرسال للسحابة
    if (supabase && cloudConnected) {
      try {
        const id = "p" + Date.now();
        const { error } = await supabase.from("products").insert([{
          id, name: p.name, category_id: p.categoryId, subcategory_id: p.subcategoryId,
          price: p.price, currency: p.currency, description: p.description,
          image: imageUrl || p.image || "", featured: p.featured || false,
          created_at: Date.now(), updated_at: Date.now(),
        }]);
        if (error) console.error("Supabase insert error:", error.message);
      } catch (err) { console.error("Supabase insert failed:", err); }
    }
  },

  async updateProduct(id: string, patch: Partial<Product>, imageUrl?: string) {
    actions.updateProduct(id, patch);
    if (supabase && cloudConnected) {
      try {
        const dbPatch: Record<string, any> = { updated_at: Date.now() };
        if (patch.name) dbPatch.name = patch.name;
        if (patch.categoryId) dbPatch.category_id = patch.categoryId;
        if (patch.subcategoryId) dbPatch.subcategory_id = patch.subcategoryId;
        if (patch.price !== undefined) dbPatch.price = patch.price;
        if (patch.currency) dbPatch.currency = patch.currency;
        if (patch.description !== undefined) dbPatch.description = patch.description;
        if (imageUrl !== undefined) dbPatch.image = imageUrl;
        if (patch.featured !== undefined) dbPatch.featured = patch.featured;
        await supabase.from("products").update(dbPatch).eq("id", id);
      } catch (err) { console.error("Supabase update failed:", err); }
    }
  },

  async deleteProduct(id: string) {
    actions.deleteProduct(id);
    if (supabase && cloudConnected) { try { await supabase.from("products").delete().eq("id", id); } catch {} }
  },

  async addAgent(a: Omit<Agent, "id" | "createdAt">) {
    actions.addAgent(a);
    if (supabase && cloudConnected) {
      try {
        await supabase.from("agents").insert([{
          id: "ag" + Date.now(), name: a.name, phone: a.phone, address: a.address,
          governorate_id: a.governorateId, created_at: Date.now(),
        }]);
      } catch (err) { console.error("Agent insert error:", err); }
    }
  },
  async updateAgent(id: string, patch: Partial<Agent>) {
    actions.updateAgent(id, patch);
    if (supabase && cloudConnected) {
      try {
        const db: Record<string, any> = {};
        if (patch.name) db.name = patch.name;
        if (patch.phone !== undefined) db.phone = patch.phone;
        if (patch.address !== undefined) db.address = patch.address;
        if (patch.governorateId) db.governorate_id = patch.governorateId;
        await supabase.from("agents").update(db).eq("id", id);
      } catch (err) { console.error("Agent update error:", err); }
    }
  },
  async deleteAgent(id: string) {
    actions.deleteAgent(id);
    if (supabase && cloudConnected) { try { await supabase.from("agents").delete().eq("id", id); } catch {} }
  },

  async addBanner(b: Omit<Banner, "id">) {
    actions.addBanner(b);
    if (supabase && cloudConnected) {
      try {
        await supabase.from("banners").insert([{
          id: "bn" + Date.now(), title: b.title, subtitle: b.subtitle, cta: b.cta,
          link: b.link, image: b.image, active: b.active !== false, created_at: Date.now(),
        }]);
      } catch (err) { console.error("Banner insert error:", err); }
    }
  },
  async updateBanner(id: string, patch: Partial<Banner>) {
    actions.updateBanner(id, patch);
    if (supabase && cloudConnected) {
      try {
        const db: Record<string, any> = {};
        if (patch.active !== undefined) db.active = patch.active;
        if (patch.title !== undefined) db.title = patch.title;
        if (patch.subtitle !== undefined) db.subtitle = patch.subtitle;
        if (patch.cta !== undefined) db.cta = patch.cta;
        if (patch.link !== undefined) db.link = patch.link;
        if (patch.image !== undefined) db.image = patch.image;
        await supabase.from("banners").update(db).eq("id", id);
      } catch (err) { console.error("Banner update error:", err); }
    }
  },
  async deleteBanner(id: string) {
    actions.deleteBanner(id);
    if (supabase && cloudConnected) { try { await supabase.from("banners").delete().eq("id", id); } catch {} }
  },

  async addMessage(m: Omit<Message, "id" | "read" | "createdAt">) {
    const result = actions.addMessage(m);
    if (supabase && cloudConnected) {
      try {
        await supabase.from("messages").insert([{
          id: "m" + Date.now(), name: m.name, email: m.email || "", phone: m.phone || "",
          subject: m.subject, message: m.message, read: false, created_at: Date.now(),
        }]);
      } catch (err) { console.error("Message insert error:", err); }
    }
    return result;
  },
  async markRead(id: string, read = true) {
    actions.markRead(id, read);
    if (supabase && cloudConnected) { try { await supabase.from("messages").update({ read }).eq("id", id); } catch {} }
  },
  async deleteMessage(id: string) {
    actions.deleteMessage(id);
    if (supabase && cloudConnected) { try { await supabase.from("messages").delete().eq("id", id); } catch {} }
  },

  async updateSettings(patch: Partial<Store["settings"]>) {
    actions.updateSettings(patch);
    if (supabase && cloudConnected) {
      try {
        const store = getStore();
        await supabase.from("settings").upsert({ key: "general", value: JSON.stringify(store.settings) });
      } catch (err) { console.error("Settings update error:", err); }
    }
  },

  isCloudConnected() { return cloudConnected; },
};

export async function reconnectCloud(): Promise<boolean> {
  supabase = null; cloudConnected = false; initPromise = null;
  return await initSupabase();
}

// ══════════════════════════════════════════════════════════
//  App Shell
// ══════════════════════════════════════════════════════════

function Shell() {
  const { route } = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [cloudReady, setCloudReady] = useState(false);

  useEffect(() => {
    const { url, key } = getCloudKeys();
    if (!url || !key) { setLoaded(true); return; }
    initSupabase().then((ok) => {
      setCloudReady(ok);
      if (ok) setupRealtime();
      setLoaded(true);
    });
  }, []);

  if (route.name === "admin-login" || route.name === "admin-dashboard") {
    if (route.name === "admin-login") return <AdminLogin />;
    return <AdminDashboard cloudReady={cloudReady} />;
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-royal-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4 animate-pulse">
            <i className="fa-solid fa-crown text-3xl text-amber-300" />
          </div>
          <div className="text-xl font-bold">جاري تحميل البيانات...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {route.name === "home" && <HomePage />}
        {route.name === "products" && <ProductsPage />}
        {route.name === "agents" && <AgentsPage />}
        {route.name === "about" && <AboutPage />}
        {route.name === "contact" && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <RouterProvider><Shell /></RouterProvider>;
}
