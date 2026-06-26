import { Link } from "../router";
import { getStore } from "../data/store";
import { Crown, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  const settings = getStore().settings;
  return (
    <footer className="bg-royal-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shadow-lg border border-white/20">
                <div className="text-center">
                  <div className="text-[8px] text-white/70 font-bold tracking-widest">ROYAL</div>
                  <Crown className="w-6 h-6 text-amber-300 -mt-0.5" />
                </div>
              </div>
              <div>
                <div className="font-extrabold text-white text-sm leading-tight">{settings.productName}</div>
                <div className="text-[10px] text-royal-200">{settings.tagline}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-royal-100 mb-3">
              رويال... الجودة بكل المقاييس. مصنع الأنوار للبلاستيك منذ 1982.
              منتجات PVC-U وPE ووصلات بأعلى المواصفات العالمية.
            </p>
            <div className="flex gap-3">
              <a href={settings.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-royal-600 flex items-center justify-center transition border border-white/20">
                <i className="fa-brands fa-facebook-f text-lg" />
              </a>
              <a href={settings.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-royal-600 flex items-center justify-center transition border border-white/20">
                <i className="fa-brands fa-instagram text-lg" />
              </a>
              <a href={settings.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-royal-600 flex items-center justify-center transition border border-white/20">
                <i className="fa-brands fa-youtube text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={{ name: "home" }} className="hover:text-white transition text-royal-100">الرئيسية</Link></li>
              <li><Link to={{ name: "products" }} className="hover:text-white transition text-royal-100">جميع المنتجات</Link></li>
              <li><Link to={{ name: "products", categoryId: "plumbing" }} className="hover:text-white transition text-royal-100">أنظمة السباكة</Link></li>
              <li><Link to={{ name: "products", categoryId: "agriculture" }} className="hover:text-white transition text-royal-100">مواد الزراعة</Link></li>
              <li><Link to={{ name: "products", categoryId: "electrical" }} className="hover:text-white transition text-royal-100">الكهرباء</Link></li>
              <li><Link to={{ name: "products", categoryId: "building" }} className="hover:text-white transition text-royal-100">مواد البناء</Link></li>
              <li><Link to={{ name: "agents" }} className="hover:text-white transition text-royal-100">نقاط البيع</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">تواصل معنا</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                  <Phone className="w-3.5 h-3.5 text-royal-200" />
                </div>
                <a href={`tel:${settings.phone}`} className="hover:text-white font-bold" dir="ltr">{settings.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5 border border-green-500/30">
                  <MessageCircle className="w-3.5 h-3.5 text-green-300" />
                </div>
                <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="hover:text-white font-bold text-green-300" dir="ltr">{settings.whatsapp}</a>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                  <Mail className="w-3.5 h-3.5 text-royal-200" />
                </div>
                <a href={`mailto:${settings.email}`} className="hover:text-white text-xs text-royal-100">{settings.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-royal-200" />
                </div>
                <span className="text-royal-100">{settings.address}</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">خدمة العملاء</h4>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                <div className="text-xs text-royal-100 mb-1">
                  <i className="fa-solid fa-user-tie ml-1" /> مسؤول المبيعات
                </div>
                <div className="text-sm font-bold text-amber-300">{settings.managerName}</div>
              </div>
              <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("السلام عليكم، أرغب بالاستفسار عن منتجات رويال")}`} target="_blank" rel="noreferrer" className="block w-full text-center px-3 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition shadow-lg">
                <i className="fa-brands fa-whatsapp ml-1" /> واتساب مباشر
              </a>
              <Link to={{ name: "contact" }} className="block w-full text-center px-3 py-2.5 rounded-lg bg-royal-600 hover:bg-royal-700 text-white text-sm font-bold transition">
                <i className="fa-solid fa-paper-plane ml-1" /> أرسل رسالة
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-royal-200">
          <div>© {new Date().getFullYear()} {settings.productName}. جميع الحقوق محفوظة.</div>
          <div className="flex items-center gap-2">
            <span className="text-amber-300 text-xs">★</span>
            <span>ALANWAR GUARANTEE - SINCE 1982</span>
            <span className="text-amber-300 text-xs">★</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
