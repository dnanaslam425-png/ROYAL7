import { useState } from "react";
import { useRouter } from "../router";
import { Crown, Lock, User, Eye, EyeOff, Copy, Check } from "lucide-react";

// ═══════════════════════════════════════════════════════════
//  بيانات الدخول للوحة التحكم - غيّرها هنا إذا أردت
// ═══════════════════════════════════════════════════════════
const ADMIN_USER = "admin";
const ADMIN_PASS = "royal2026";

export function AdminLogin() {
  const { navigate } = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem("royal_admin", "1");
      navigate({ name: "admin-dashboard" });
    } else {
      setErr("بيانات الدخول غير صحيحة! تأكد من كتابة البيانات كما هي");
    }
  };

  const copyCreds = () => {
    navigator.clipboard.writeText(`المستخدم: ${ADMIN_USER}\nكلمة المرور: ${ADMIN_PASS}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-royal-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-20" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-royal-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-royal-300/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top bar */}
          <div className="bg-royal-900 px-6 py-4 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-3 border border-white/20">
              <Crown className="w-8 h-8 text-amber-300" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white">لوحة تحكم رويال</h1>
            <p className="text-[10px] sm:text-xs text-royal-200 mt-1">للمدير فقط</p>
          </div>

          {/* Credentials display */}
          <div className="px-6 py-3 bg-amber-50 border-b border-amber-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800">
                  <i className="fa-solid fa-key ml-1" /> بيانات الدخول:
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-white px-2 py-1 rounded font-mono font-bold text-royal-800 border border-royal-200" dir="ltr">
                    {ADMIN_USER}
                  </span>
                  <span className="text-xs bg-white px-2 py-1 rounded font-mono font-bold text-royal-800 border border-royal-200" dir="ltr">
                    {ADMIN_PASS}
                  </span>
                </div>
              </div>
              <button
                onClick={copyCreds}
                className="text-xs flex items-center gap-1 px-2 py-1 rounded bg-amber-200 hover:bg-amber-300 text-amber-800 transition"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "تم النسخ" : "نسخ"}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-silver-700 mb-1.5">
                  اسم المستخدم
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-silver-400" />
                  <input
                    type="text"
                    value={user}
                    onChange={(e) => {
                      setUser(e.target.value);
                      setErr("");
                    }}
                    className="w-full pr-10 pl-3 py-3 rounded-xl border border-silver-200 focus:border-royal-500 outline-none text-sm bg-silver-50"
                    placeholder={ADMIN_USER}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-silver-700 mb-1.5">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-silver-400" />
                  <input
                    type={show ? "text" : "password"}
                    value={pass}
                    onChange={(e) => {
                      setPass(e.target.value);
                      setErr("");
                    }}
                    className="w-full pr-10 pl-10 py-3 rounded-xl border border-silver-200 focus:border-royal-500 outline-none text-sm bg-silver-50"
                    placeholder={ADMIN_PASS}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-400 hover:text-royal-600"
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {err && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2 anim-fade">
                  <i className="fa-solid fa-triangle-exclamation" /> {err}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-royal-600 hover:bg-royal-700 text-white font-bold shadow-lg shadow-royal-600/30 transition text-sm"
              >
                <i className="fa-solid fa-right-to-bracket ml-1" /> دخول لوحة التحكم
              </button>
            </form>

            <div className="mt-5 text-center">
              <a
                href="#/"
                className="text-xs text-silver-400 hover:text-royal-600 flex items-center justify-center gap-1"
              >
                <i className="fa-solid fa-arrow-right ml-1" /> العودة للموقع الرئيسي
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-silver-50 border-t border-silver-200 text-center">
            <div className="text-[10px] text-silver-400">
              مصنع رويال للأنابيب ومستلزماتها • 782002220
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}