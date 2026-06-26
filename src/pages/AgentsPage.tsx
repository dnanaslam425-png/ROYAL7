import { useEffect, useMemo, useState } from "react";
import { GOVERNORATES, getStore } from "../data/store";
import { useRouter } from "../router";
import { Phone, MapPin, Search, Building2, UserPlus } from "lucide-react";

export function AgentsPage() {
  const { route } = useRouter();
  const initialGov = route.name === "agents" ? route.governorateId : undefined;
  const [gov, setGov] = useState<string | undefined>(initialGov);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const store = getStore();

  useEffect(() => {
    setGov(initialGov);
  }, [initialGov]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [gov, search]);

  const filtered = useMemo(() => {
    return store.agents.filter((a) => {
      if (gov && a.governorateId !== gov) return false;
      if (
        search &&
        !a.name.includes(search) &&
        !a.address.includes(search) &&
        !a.phone.includes(search)
      )
        return false;
      return true;
    });
  }, [store.agents, gov, search]);

  const govName = (id: string) =>
    GOVERNORATES.find((g) => g.id === id)?.name || "غير محدد";

  const grouped = GOVERNORATES.map((g) => ({
    gov: g,
    count: store.agents.filter((a) => a.governorateId === g.id).length,
  }));

  return (
    <div className="bg-silver-50 min-h-screen">
      <div className="bg-royal-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="text-center">
            <i className="fa-solid fa-handshake text-4xl mb-3 opacity-80" />
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-2">نقاط البيع بجميع المحافظات</h1>
            <p className="text-royal-100 max-w-2xl mx-auto text-sm sm:text-base">
              شبكة معتمدة من نقاط البيع في جميع محافظات اليمن الـ 21
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Governorate map */}
        <div className="bg-white rounded-2xl border border-silver-200 p-5 mb-6">
          <h2 className="font-extrabold text-royal-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-map-location-dot text-royal-600" />
            خريطة المحافظات
            <span className="text-xs font-normal text-silver-500">
              (اضغط على المحافظة لعرض الوكلاء)
            </span>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
            {grouped.map(({ gov: g, count }) => {
              const active = g.id === gov;
              return (
                <button
                  key={g.id}
                  onClick={() => setGov(active ? undefined : g.id)}
                  className={`relative p-3 rounded-xl text-sm font-bold transition border ${
                    active
                      ? "bg-royal-600 text-white border-royal-700 shadow-lg shadow-royal-600/30"
                      : count > 0
                      ? "bg-royal-50 text-royal-700 border-royal-200 hover:bg-royal-100"
                      : "bg-silver-50 text-silver-500 border-silver-200 hover:bg-silver-100"
                  }`}
                >
                  <div className="text-xs sm:text-sm">{g.name}</div>
                  <div className={`text-[10px] mt-1 ${active ? "text-white/80" : "text-silver-500"}`}>
                    <i className="fa-solid fa-users ml-1" /> {count} وكيل
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-silver-200 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-silver-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم الوكيل، المدينة، أو الهاتف..."
              className="w-full pr-10 pl-3 py-2.5 rounded-lg border border-silver-200 focus:border-royal-500 outline-none text-sm"
            />
          </div>
          {gov && (
            <button
              onClick={() => setGov(undefined)}
              className="px-4 py-2 rounded-lg bg-silver-100 text-silver-700 text-sm font-bold hover:bg-silver-200"
            >
              <i className="fa-solid fa-xmark ml-1" /> إزالة الفلتر
            </button>
          )}
        </div>

        <div className="text-sm text-silver-600 mb-4">
          عرض{" "}
          <span className="font-bold text-royal-900">{filtered.length}</span> وكيل
          {gov && (
            <>
              {" "}
              في{" "}
              <span className="font-bold text-royal-900">{govName(gov)}</span>
            </>
          )}
        </div>

        {/* Agents list */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-silver-200 p-5 space-y-3">
                <div className="h-5 skeleton rounded w-2/3" />
                <div className="h-4 skeleton rounded" />
                <div className="h-4 skeleton rounded" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-silver-200 p-12 text-center">
            <i className="fa-solid fa-user-slash text-6xl text-silver-300 mb-4" />
            <h3 className="text-xl font-bold text-royal-900 mb-2">
              لا يوجد وكلاء مسجلين {gov ? `في ${govName(gov)} حالياً` : "لمطابقة بحثك"}
            </h3>
            <p className="text-silver-500 mb-4">
              {gov ? "يمكنك التواصل مع المديرية الرئيسية" : "لا توجد نتائج مطابقة"}
            </p>
            <a
              href="#/contact"
              className="inline-block px-5 py-2.5 rounded-lg bg-royal-600 text-white font-bold hover:bg-royal-700"
            >
              <UserPlus className="w-4 h-4 inline ml-1" /> سجل كوكيل جديد
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-2xl border border-silver-200 p-5 hover:shadow-xl hover:border-royal-300 transition group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center text-xl shrink-0 group-hover:bg-royal-600 group-hover:text-white transition">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-royal-900 truncate">{a.name}</h3>
                    <div className="text-xs text-silver-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {govName(a.governorateId)}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-silver-700">
                    <Phone className="w-4 h-4 text-royal-600 shrink-0" />
                    <a href={`tel:${a.phone}`} className="hover:text-royal-600 font-medium" dir="ltr">
                      {a.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-silver-600 text-xs">
                    <MapPin className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
                    <span>{a.address}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <a
                    href={`tel:${a.phone}`}
                    className="flex-1 text-center px-3 py-2 rounded-lg bg-royal-50 text-royal-700 text-xs font-bold hover:bg-royal-600 hover:text-white transition"
                  >
                    <Phone className="w-3.5 h-3.5 inline ml-1" /> اتصال
                  </a>
                  <a
                    href={`https://wa.me/${a.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center px-3 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-bold hover:bg-green-600 hover:text-white transition"
                  >
                    <i className="fa-brands fa-whatsapp ml-1" /> واتساب
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}