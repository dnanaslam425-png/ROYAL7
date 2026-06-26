import { useState } from "react";
import type { Product } from "../data/store";
import { getStore } from "../data/store";
import { MessageCircle } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hover, setHover] = useState(false);
  const settings = getStore().settings;

  const waMessage = encodeURIComponent(
    `السلام عليكم، أرغب بالاستفسار عن: ${product.name}`
  );
  const waLink = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${waMessage}`;

  return (
    <div
      className="group bg-white rounded-2xl border border-silver-200 overflow-hidden hover:shadow-2xl hover:border-royal-300 hover:-translate-y-1 transition-all duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-square bg-silver-100 overflow-hidden">
        {!imgLoaded && !imgError && <div className="absolute inset-0 skeleton" />}
        {imgError || !product.image ? (
          <div className="absolute inset-0 bg-gradient-to-br from-royal-50 to-silver-100 flex flex-col items-center justify-center text-silver-400">
            <i className="fa-solid fa-image text-5xl mb-2 text-royal-300" />
            <span className="text-xs font-bold text-royal-500">رويال</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"} ${hover ? "scale-110" : "scale-100"}`}
          />
        )}

        {product.featured && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
            <i className="fa-solid fa-star" /> مميز
          </div>
        )}

        <div className={`absolute inset-0 bg-royal-900/50 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity ${hover ? "opacity-100" : "opacity-0"}`}>
          <a href={waLink} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition shadow-lg" aria-label="واتساب">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="p-3 lg:p-4">
        <h3 className="font-bold text-royal-900 mb-1 line-clamp-1 text-xs lg:text-sm leading-snug">{product.name}</h3>
        <p className="text-[10px] lg:text-xs text-silver-500 line-clamp-2 mb-3 leading-relaxed">{product.description}</p>
        <a href={waLink} target="_blank" rel="noreferrer" className="block w-full text-center px-3 py-2 rounded-lg bg-royal-600 text-white text-xs font-bold hover:bg-royal-700 transition shadow-md shadow-royal-600/20">
          <i className="fa-brands fa-whatsapp ml-1" /> استفسر الآن
        </a>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-silver-200 overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-4 skeleton rounded" />
        <div className="h-3 skeleton rounded w-2/3" />
        <div className="h-8 skeleton rounded mt-3" />
      </div>
    </div>
  );
}
