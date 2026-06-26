import { useEffect, useMemo, useState } from "react";
import { getStore, type Product } from "../data/store";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";
import { useRouter } from "../router";
import { Search, Filter, X } from "lucide-react";

export function ProductsPage() {
  const { route } = useRouter();
  const initialCat = route.name === "products" ? route.categoryId : undefined;
  const [categoryId, setCategoryId] = useState<string | undefined>(initialCat);
  const [subId, setSubId] = useState<string | undefined>();
  const [search, setSearch] = useState("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const store = getStore();
  const cats = store.categories;

  useEffect(() => {
    setCategoryId(initialCat);
  }, [initialCat]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [categoryId, subId, search, priceMax]);

  const filtered: Product[] = useMemo(() => {
    return store.products.filter((p) => {
      if (categoryId && p.categoryId !== categoryId) return false;
      if (subId && p.subcategoryId !== subId) return false;
      if (search && !p.name.includes(search) && !p.description.includes(search)) return false;
      if (priceMax !== "" && p.price > Number(priceMax)) return false;
      return true;
    });
  }, [store.products, categoryId, subId, search, priceMax]);

  const activeCat = cats.find((c) => c.id === categoryId);

  const clearFilters = () => {
    setSearch("");
    setPriceMax("");
    setCategoryId(undefined);
    setSubId(undefined);
  };

  return (
    <div className="bg-silver-50 min-h-screen">
      {/* Header */}
      <div className="bg-royal-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="text-center">
            <i className="fa-solid fa-boxes-stacked text-4xl mb-3 opacity-80" />
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-2">
              {activeCat ? activeCat.name : "جميع المنتجات"}
            </h1>
            <p className="text-royal-100 max-w-2xl mx-auto">
              {activeCat
                ? activeCat.description
                : "تصفح تشكيلتنا الكاملة من الأنابيب، مواسير الري، الكهرباء، ومواد البناء"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => { setCategoryId(undefined); setSubId(undefined); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              !categoryId
                ? "bg-royal-600 text-white shadow-md"
                : "bg-white text-royal-700 border border-silver-200 hover:border-royal-300"
            }`}
          >
            <i className="fa-solid fa-grid-2 ml-1" /> الكل ({store.products.length})
          </button>
          {cats.map((c) => {
            const count = store.products.filter((p) => p.categoryId === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => { setCategoryId(c.id); setSubId(undefined); }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
                  categoryId === c.id
                    ? "bg-royal-600 text-white shadow-md"
                    : "bg-white text-royal-700 border border-silver-200 hover:border-royal-300"
                }`}
              >
                <i className={c.icon} /> {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Subcategories */}
        {activeCat && activeCat.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 anim-fade">
            <button
              onClick={() => setSubId(undefined)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                !subId
                  ? "bg-royal-100 text-royal-800 border border-royal-300"
                  : "bg-white text-silver-600 border border-silver-200 hover:border-royal-300"
              }`}
            >
              الكل ({activeCat.subcategories.length})
            </button>
            {activeCat.subcategories.map((sc) => {
              const count = store.products.filter(
                (p) => p.categoryId === activeCat.id && p.subcategoryId === sc.id
              ).length;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSubId(sc.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    subId === sc.id
                      ? "bg-royal-100 text-royal-800 border border-royal-300"
                      : "bg-white text-silver-600 border border-silver-200 hover:border-royal-300"
                  }`}
                >
                  {sc.name} ({count})
                </button>
              );
            })}
          </div>
        )}

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block bg-white rounded-2xl border border-silver-200 p-5 h-fit lg:sticky lg:top-24`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-royal-900 flex items-center gap-2">
                <Filter className="w-4 h-4" /> فلترة
              </h3>
              <button onClick={clearFilters} className="text-xs text-silver-500 hover:text-royal-600">
                مسح الكل
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-silver-600 mb-2">
                <Search className="w-3.5 h-3.5 inline ml-1" /> بحث
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="اسم المنتج..."
                className="w-full px-3 py-2 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-silver-600 mb-2">
                السعر الأقصى (ريال)
              </label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="بدون حد"
                className="w-full px-3 py-2 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm"
              />
            </div>

            <div>
              <h4 className="text-xs font-bold text-silver-600 mb-2">الفئات</h4>
              <div className="space-y-1">
                {cats.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setCategoryId(c.id); setSubId(undefined); }}
                    className={`w-full text-right px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition ${
                      categoryId === c.id
                        ? "bg-royal-50 text-royal-700"
                        : "hover:bg-silver-50 text-silver-700"
                    }`}
                  >
                    <span><i className={`${c.icon} ml-2 text-royal-600`} />{c.name}</span>
                    <span className="text-xs text-silver-400">
                      {store.products.filter((p) => p.categoryId === c.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="lg:hidden fixed bottom-6 left-6 z-40 px-4 py-3 rounded-full bg-royal-600 text-white shadow-2xl"
          >
            <Filter className="w-5 h-5 ml-1" /> فلترة
          </button>
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setShowFilters(false)}>
              <div className="absolute bottom-0 right-0 left-0 bg-white rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between mb-3">
                  <h3 className="font-bold">فلترة</h3>
                  <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button onClick={() => { setCategoryId(undefined); setSubId(undefined); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!categoryId ? "bg-royal-600 text-white" : "bg-silver-100 text-silver-700"}`}>الكل</button>
                  {cats.map((c) => (
                    <button key={c.id} onClick={() => { setCategoryId(c.id); setSubId(undefined); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${categoryId === c.id ? "bg-royal-600 text-white" : "bg-silver-100 text-silver-700"}`}>{c.name}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-silver-600">
                <span className="font-bold text-royal-900">{filtered.length}</span> منتج
              </div>
              {(categoryId || subId || search || priceMax !== "") && (
                <button onClick={clearFilters} className="text-xs text-royal-600 font-bold hover:underline">
                  <X className="w-3.5 h-3.5 inline ml-1" /> إزالة الفلاتر
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-silver-200 p-12 text-center">
                <i className="fa-solid fa-box-open text-6xl text-silver-300 mb-4" />
                <h3 className="text-xl font-bold text-royal-900 mb-2">لا توجد منتجات مطابقة</h3>
                <p className="text-silver-500 mb-4">جرّب تعديل الفلاتر أو البحث بكلمات أخرى</p>
                <button onClick={clearFilters} className="px-4 py-2 rounded-lg bg-royal-600 text-white font-bold">إعادة تعيين</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}