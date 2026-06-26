import { useEffect, useState } from "react";
import { getStore } from "../data/store";

export function HeroSlider() {
  const banners = getStore().banners.filter((b) => b.active);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => { setIdx((i) => (i + 1) % banners.length); }, 5000);
    return () => clearInterval(t);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const b = banners[idx];

  return (
    <section className="relative h-[280px] sm:h-[400px] lg:h-[560px] overflow-hidden">
      {banners.map((bn, i) => (
        <div key={bn.id} className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}>
          <img src={bn.image} alt={bn.title} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
          <div className="absolute inset-0 bg-gradient-to-l from-royal-950/90 via-royal-900/70 to-royal-900/40" />
          <div className="absolute inset-0 pattern-grid opacity-30" />
        </div>
      ))}

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white" key={idx}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
            عروض حصرية من مصنع رويال
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            {b.title}
          </h1>
          <p className="text-base sm:text-lg text-silver-100 mb-6 leading-relaxed max-w-xl">
            {b.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={b.link} className="px-6 py-3 rounded-xl bg-royal-500 hover:bg-royal-400 text-white font-bold shadow-2xl shadow-royal-900/50 transition transform hover:-translate-y-0.5">
              {b.cta} <i className="fa-solid fa-arrow-left mr-2" />
            </a>
            <a href="#agents" className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/30 text-white font-bold hover:bg-white/20 transition">
              <i className="fa-solid fa-map-location-dot ml-2" /> الوكلاء
            </a>
          </div>
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <div className="absolute bottom-6 right-1/2 translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`الشريحة ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === idx ? "bg-white w-10" : "bg-white/40 w-2"}`} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}