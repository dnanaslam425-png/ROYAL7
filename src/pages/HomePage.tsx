import { HeroSlider } from "../components/HeroSlider";
import { ProductCard } from "../components/ProductCard";
import { Link } from "../router";
import { getStore } from "../data/store";
import { ShieldCheck, Truck, Award, Headphones, ArrowLeft, Sparkles, Crown } from "lucide-react";

export function HomePage() {
  const store = getStore();
  const featured = store.products.filter((p) => p.featured).slice(0, 8);
  const latest = [...store.products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  const settings = store.settings;

  return (
    <div>
      <HeroSlider />

      {/* Trust bar - أزرق ملكي */}
      <section className="bg-white border-b border-silver-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: <ShieldCheck className="w-6 h-6" />, title: "جودة عالمية", desc: "ISO 9001 · المواصفات الألمانية" },
            { icon: <Truck className="w-6 h-6" />, title: "توصيل لكل اليمن", desc: `21 محافظة - ${settings.deliveryPhone}` },
            { icon: <Award className="w-6 h-6" />, title: "منذ 1982", desc: "مصنع الأنوار للبلاستيك" },
            { icon: <Headphones className="w-6 h-6" />, title: "دعم فني", desc: `رمزي القحطاني: ${settings.salesPhone}` },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-royal-50 transition">
              <div className="w-11 h-11 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">{f.icon}</div>
              <div>
                <div className="font-bold text-royal-900 text-sm">{f.title}</div>
                <div className="text-xs text-silver-500">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 text-royal-700 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> تشكيلة شاملة
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-royal-900 mb-3">أقسام المنتجات الرئيسية</h2>
          <p className="text-silver-500 max-w-2xl mx-auto text-sm">أنابيب، وصلات، مواد بناء، كهرباء، زراعة</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {store.categories.map((c) => {
            const count = store.products.filter((p) => p.categoryId === c.id).length;
            return (
              <Link key={c.id} to={{ name: "products", categoryId: c.id }} className="group">
                <div className="h-full bg-white rounded-2xl border border-silver-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className={`h-1.5 bg-gradient-to-l ${c.color}`} />
                  <div className="p-4 lg:p-5">
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center text-xl shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                      <i className={c.icon} />
                    </div>
                    <h3 className="text-sm lg:text-lg font-extrabold text-royal-900 mb-1">{c.name}</h3>
                    <p className="text-[10px] lg:text-xs text-silver-500 mb-3 line-clamp-2">{c.description}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-silver-100">
                      <span className="text-[10px] font-bold text-silver-500"><i className="fa-solid fa-boxes-stacked ml-1" /> {count} منتج</span>
                      <span className="flex items-center gap-1 text-royal-600 text-xs font-bold group-hover:gap-2 transition-all">تصفح <ArrowLeft className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-silver-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
                <i className="fa-solid fa-fire" /> الأكثر طلباً
              </div>
              <h2 className="text-xl lg:text-3xl font-extrabold text-royal-900">منتجات مميزة</h2>
            </div>
            <Link to={{ name: "products" }} className="text-royal-600 text-sm font-bold hover:text-royal-800 flex items-center gap-1">عرض الكل <ArrowLeft className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold mb-2">
              <i className="fa-solid fa-sparkles" /> جديد
            </div>
            <h2 className="text-xl lg:text-3xl font-extrabold text-royal-900">أحدث ما وصل</h2>
          </div>
          <Link to={{ name: "products" }} className="text-royal-600 text-sm font-bold hover:text-royal-800 flex items-center gap-1">عرض الكل <ArrowLeft className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
          {latest.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Quality Seal */}
      <section className="bg-royal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-14 h-14 rounded-xl bg-royal-800 flex items-center justify-center border border-royal-600">
                  <Crown className="w-7 h-7 text-amber-300" />
                </div>
              </div>
              <h2 className="text-xl lg:text-3xl font-extrabold mb-3">رويال... الجودة بكل المقاييس</h2>
              <p className="text-royal-100 text-sm leading-relaxed mb-4">
                مصنع الأنوار للبلاستيك ينتج وفق المواصفات القياسية العالمية. منتجات معتمدة ISO 9001.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-royal-800 rounded-xl p-3 text-center"><div className="text-xl font-extrabold text-amber-300">SINCE</div><div className="font-bold">1982</div></div>
                <div className="bg-royal-800 rounded-xl p-3 text-center"><div className="text-xl font-extrabold text-amber-300">ISO</div><div className="font-bold">9001</div></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "fa-solid fa-flask-vial", title: "كفاءة عالية" },
                { icon: "fa-solid fa-gauge-high", title: "مرونة عالية" },
                { icon: "fa-solid fa-ruler-combined", title: "تنوع المقاسات" },
                { icon: "fa-solid fa-clock", title: "عمر أطول" },
                { icon: "fa-solid fa-shield-halved", title: "مقاومة للصدأ" },
                { icon: "fa-solid fa-screwdriver-wrench", title: "سهولة التركيب" },
              ].map((f, i) => (
                <div key={i} className="bg-royal-800 rounded-xl p-3 hover:bg-royal-700 transition">
                  <i className={`${f.icon} text-amber-300 text-lg mb-1`} />
                  <div className="font-bold text-xs">{f.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-l from-royal-600 to-royal-900 p-6 lg:p-10 text-white">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl lg:text-2xl font-extrabold mb-2">هل أنت وكيل أو موزع؟</h3>
              <p className="text-royal-100 text-sm leading-relaxed">انضم لشبكة نقاط البيع واستفد من خصومات المصنع.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to={{ name: "contact" }} className="px-5 py-2.5 rounded-xl bg-white text-royal-700 text-sm font-bold hover:bg-silver-100 transition shadow-xl">سجل كوكيل</Link>
              <Link to={{ name: "agents" }} className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/30 text-white text-sm font-bold hover:bg-white/20 transition">نقاط البيع</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
