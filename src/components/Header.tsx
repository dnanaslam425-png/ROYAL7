import { Link, useRouter } from "../router";
import { useState } from "react";
import { Menu, X, ChevronDown, Crown } from "lucide-react";
import { getStore } from "../data/store";

export function Header() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const { route } = useRouter();
  const store = getStore();
  const settings = store.settings;

  const navItem = (active: boolean) =>
    `px-3 lg:px-4 py-2 rounded-lg text-sm font-bold transition-all ${
      active
        ? "bg-royal-600 text-white shadow-md shadow-royal-600/30"
        : "text-royal-900 hover:bg-royal-50"
    }`;

  const isActive = (n: string) => route.name === n;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-silver-200 shadow-sm">
      {/* Top info bar - أزرق ملكي فاتح بدلاً من الأسود */}
      <div className="bg-royal-800 text-white text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>
              <i className="fa-solid fa-user-tie ml-1" />
              مسؤول المبيعات: <b>رمزي القحطاني</b>
            </span>
            <span dir="ltr">
              <i className="fa-solid fa-phone ml-1" />
              المبيعات: {settings.salesPhone}
            </span>
            <span dir="ltr">
              <i className="fa-solid fa-calculator ml-1" />
              الحسابات: {settings.accountsPhone}
            </span>
            <span dir="ltr">
              <i className="fa-solid fa-headset ml-1" />
              الاستفسار: {settings.inquiryPhone}
            </span>
            <span dir="ltr">
              <i className="fa-solid fa-truck ml-1" />
              التوصيل: {settings.deliveryPhone}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-royal-200">
              <i className="fa-solid fa-envelope ml-1" />
              {settings.email}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
          {/* Logo */}
          <Link to={{ name: "home" }} className="flex items-center gap-2 lg:gap-3 shrink-0">
            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-royal-gradient flex items-center justify-center shadow-lg shadow-royal-600/30">
              <div className="text-center">
                <div className="text-[8px] lg:text-[10px] text-white/80 font-bold tracking-widest">ROYAL</div>
                <Crown className="w-5 h-5 lg:w-7 lg:h-7 text-amber-300 -mt-0.5" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs sm:text-sm lg:text-lg font-extrabold text-royal-900 leading-tight">
                مصنع رويال للأنابيب
              </div>
              <div className="text-[8px] sm:text-[10px] lg:text-xs text-silver-500 font-medium">
                Royal Factory for Pipes
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to={{ name: "home" }}>
              <button className={navItem(isActive("home"))}>الرئيسية</button>
            </Link>

            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <Link to={{ name: "products" }}>
                <button className={`${navItem(isActive("products"))} flex items-center gap-1`}>
                  المنتجات <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </Link>
              {catOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-silver-200 p-2 anim-fade">
                  <Link to={{ name: "products" }} onClick={() => setCatOpen(false)}>
                    <div className="px-3 py-2 rounded-lg hover:bg-royal-50 text-sm font-bold text-royal-900">جميع المنتجات</div>
                  </Link>
                  {store.categories.map((c) => (
                    <Link key={c.id} to={{ name: "products", categoryId: c.id }} onClick={() => setCatOpen(false)}>
                      <div className="px-3 py-2 rounded-lg hover:bg-royal-50 text-sm font-medium text-silver-700 flex items-center gap-2">
                        <i className={`${c.icon} text-royal-600`} /> {c.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to={{ name: "agents" }}>
              <button className={navItem(isActive("agents"))}>نقاط البيع</button>
            </Link>
            <Link to={{ name: "about" }}>
              <button className={navItem(isActive("about"))}>عن الشركة</button>
            </Link>
            <Link to={{ name: "contact" }}>
              <button className={navItem(isActive("contact"))}>اتصل بنا</button>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link to={{ name: "admin-login" }}>
              <button className="px-4 py-2 rounded-lg bg-royal-600 text-white text-sm font-bold hover:bg-royal-700 shadow-md shadow-royal-600/30">
                <i className="fa-solid fa-lock ml-1" /> لوحة التحكم
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 rounded-lg bg-royal-50 text-royal-700" onClick={() => setOpen(!open)} aria-label="القائمة">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="lg:hidden pb-4 anim-fade">
            {/* Mobile contact info - أزرق ملكي */}
            <div className="bg-royal-100 rounded-xl p-3 mb-3 text-xs space-y-1.5">
              <div className="font-bold text-royal-800 mb-2">
                <i className="fa-solid fa-user-tie ml-1" /> رمزي القحطاني - مسؤول المبيعات
              </div>
              <div dir="ltr" className="text-royal-700"> المبيعات: {settings.salesPhone}</div>
              <div dir="ltr" className="text-royal-700">🧮 الحسابات: {settings.accountsPhone}</div>
              <div dir="ltr" className="text-royal-700">📞 الاستفسار: {settings.inquiryPhone}</div>
              <div dir="ltr" className="text-royal-700">🚚 التوصيل: {settings.deliveryPhone}</div>
            </div>

            <div className="flex flex-col gap-1">
              <Link to={{ name: "home" }} onClick={() => setOpen(false)}>
                <button className={navItem(isActive("home")) + " w-full text-right"}>الرئيسية</button>
              </Link>
              <Link to={{ name: "products" }} onClick={() => setOpen(false)}>
                <button className={navItem(isActive("products")) + " w-full text-right"}>المنتجات</button>
              </Link>
              <Link to={{ name: "agents" }} onClick={() => setOpen(false)}>
                <button className={navItem(isActive("agents")) + " w-full text-right"}>نقاط البيع</button>
              </Link>
              <Link to={{ name: "about" }} onClick={() => setOpen(false)}>
                <button className={navItem(isActive("about")) + " w-full text-right"}>عن الشركة</button>
              </Link>
              <Link to={{ name: "contact" }} onClick={() => setOpen(false)}>
                <button className={navItem(isActive("contact")) + " w-full text-right"}>اتصل بنا</button>
              </Link>
              <Link to={{ name: "admin-login" }} onClick={() => setOpen(false)}>
                <button className="w-full text-right px-4 py-2 rounded-lg bg-royal-600 text-white text-sm font-bold mt-2">
                  <i className="fa-solid fa-lock ml-1" /> لوحة التحكم
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}