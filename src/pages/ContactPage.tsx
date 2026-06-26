import { useState } from "react";
import { actions, getStore } from "../data/store";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Loader2,
  Calculator,
  Headphones,
  Truck,
  User,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactPage() {
  const settings = getStore().settings;
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "الاسم مطلوب";
    if (!form.email.trim() && !form.phone.trim())
      e.email = "يجب إدخال البريد أو الجوال";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "بريد إلكتروني غير صحيح";
    if (!form.subject.trim()) e.subject = "الموضوع مطلوب";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "الرسالة قصيرة جداً (10 أحرف على الأقل)";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSuccess(false);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    actions.addMessage(form);
    setLoading(false);
    setSuccess(true);
    setForm(empty);
    setTimeout(() => setSuccess(false), 5000);
  };

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const inputCls = (err?: string) =>
    `w-full px-4 py-3 rounded-xl border ${
      err ? "border-red-400 bg-red-50" : "border-silver-200"
    } focus:border-royal-500 outline-none text-sm transition`;

  const contactCards = [
    { icon: <User className="w-6 h-6" />, title: "مسؤول المبيعات", name: settings.managerName, phone: settings.salesPhone, color: "text-royal-600 bg-royal-50" },
    { icon: <Phone className="w-6 h-6" />, title: "المبيعات", name: "", phone: settings.salesPhone, color: "text-blue-600 bg-blue-50" },
    { icon: <Calculator className="w-6 h-6" />, title: "الحسابات", name: "", phone: settings.accountsPhone, color: "text-amber-600 bg-amber-50" },
    { icon: <Headphones className="w-6 h-6" />, title: "الاستفسار", name: "", phone: settings.inquiryPhone, color: "text-green-600 bg-green-50" },
    { icon: <Truck className="w-6 h-6" />, title: "التوصيل", name: "", phone: settings.deliveryPhone, color: "text-purple-600 bg-purple-50" },
    { icon: <MessageCircle className="w-6 h-6" />, title: "واتساب", name: "", phone: settings.whatsapp, color: "text-green-600 bg-green-50", isWhatsapp: true },
    { icon: <Mail className="w-6 h-6" />, title: "البريد الإلكتروني", name: "", phone: settings.email, color: "text-royal-600 bg-royal-50", isEmail: true },
  ];

  return (
    <div className="bg-silver-50 min-h-screen">
      <div className="bg-royal-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 text-center">
          <i className="fa-solid fa-envelope-open-text text-4xl mb-3 opacity-80" />
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-2">اتصل بنا</h1>
          <p className="text-royal-100 max-w-2xl mx-auto">
            نحن هنا لخدمتك. تواصل معنا عبر أي من القنوات التالية وسنرد عليك في أقرب وقت
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {contactCards.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-silver-200 p-5 hover:shadow-xl hover:border-royal-300 transition group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>
                {c.icon}
              </div>
              <h3 className="font-bold text-royal-900 mb-1">{c.title}</h3>
              {c.name && <div className="text-xs text-silver-500 mb-1">{c.name}</div>}
              {c.isWhatsapp ? (
                <a
                  href={`https://wa.me/${c.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="text-sm font-bold text-green-600 hover:text-green-700 block"
                >
                  {c.phone}
                </a>
              ) : c.isEmail ? (
                <a
                  href={`mailto:${c.phone}`}
                  className="text-sm font-bold text-royal-600 hover:text-royal-700 block"
                >
                  {c.phone}
                </a>
              ) : (
                <a
                  href={`tel:${c.phone}`}
                  dir="ltr"
                  className="text-sm font-bold text-royal-700 hover:text-royal-800 block"
                >
                  {c.phone}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-silver-200 p-5">
              <div className="w-12 h-12 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-royal-900 mb-1">العنوان</h3>
              <p className="text-silver-600 text-sm">{settings.address}</p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("السلام عليكم، أرغب بالاستفسار عن منتجات رويال")}`}
              target="_blank"
              rel="noreferrer"
              className="block bg-gradient-to-l from-green-600 to-green-700 rounded-2xl p-5 text-white hover:shadow-xl transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <i className="fa-brands fa-whatsapp text-3xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">تواصل واتساب مباشر</h3>
                  <p className="text-green-100 text-sm">رد فوري من مسؤول المبيعات</p>
                  <div className="mt-1 text-xs bg-white/10 inline-block px-2 py-1 rounded-lg font-bold" dir="ltr">
                    {settings.whatsapp}
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-silver-200 p-6">
            <h2 className="text-xl font-extrabold text-royal-900 mb-4">
              <i className="fa-solid fa-paper-plane ml-2" /> أرسل لنا رسالة
            </h2>

            {success && (
              <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex items-center gap-2 anim-fade">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-bold">تم إرسال رسالتك بنجاح</div>
                  <div className="text-xs">سنقوم بالرد عليك في أقرب وقت ممكن</div>
                </div>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-silver-700 mb-1.5">الاسم الكامل *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputCls(errors.name)}
                    placeholder="محمد أحمد"
                  />
                  {errors.name && (
                    <div className="text-xs text-red-600 mt-1"><i className="fa-solid fa-circle-exclamation ml-1" />{errors.name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-silver-700 mb-1.5">رقم الجوال</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputCls()}
                    placeholder="+967..."
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-silver-700 mb-1.5">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls(errors.email)}
                  placeholder="example@mail.com"
                  dir="ltr"
                />
                {errors.email && (
                  <div className="text-xs text-red-600 mt-1"><i className="fa-solid fa-circle-exclamation ml-1" />{errors.email}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-silver-700 mb-1.5">الموضوع *</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className={inputCls(errors.subject)}
                  placeholder="موضوع الرسالة"
                />
                {errors.subject && (
                  <div className="text-xs text-red-600 mt-1"><i className="fa-solid fa-circle-exclamation ml-1" />{errors.subject}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-silver-700 mb-1.5">الرسالة *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={5}
                  className={inputCls(errors.message)}
                  placeholder="اكتب رسالتك هنا..."
                />
                {errors.message && (
                  <div className="text-xs text-red-600 mt-1"><i className="fa-solid fa-circle-exclamation ml-1" />{errors.message}</div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold shadow-lg shadow-royal-600/30 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> جاري الإرسال...</>
                ) : (
                  <><Send className="w-4 h-4" /> إرسال الرسالة</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl border border-silver-200 overflow-hidden">
          <div className="p-4 border-b border-silver-200 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-royal-600" />
            <h3 className="font-bold text-royal-900">موقع الشركة على الخريطة</h3>
          </div>
          <div className="aspect-[16/9] sm:aspect-[21/9]">
            <iframe
              src={settings.mapsEmbed}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع رويال"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}