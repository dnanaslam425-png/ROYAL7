import { getStore } from "../data/store";
import { Target, Eye, Award, Users, TrendingUp, CheckCircle2, Factory } from "lucide-react";

export function AboutPage() {
  const settings = getStore().settings;

  return (
    <div className="bg-silver-50 min-h-screen">
      <div className="bg-royal-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4">
            <Factory className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold mb-3">عن الشركة</h1>
          <p className="text-royal-100 max-w-2xl mx-auto leading-relaxed">
            مصنع الأنوار للبلاستيك - رويال
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
            <i className="fa-solid fa-certificate text-amber-300" /> ALANWAR GUARANTEE · SINCE 1982
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Intro */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 text-royal-700 text-xs font-bold mb-3">
              من نحن
            </div>
            <h2 className="text-3xl font-extrabold text-royal-900 mb-4">
              مصنع رويال للأنابيب ومستلزماتها
            </h2>
            <p className="text-silver-700 leading-relaxed mb-4">
              يتأسس مصنع الأنوار للبلاستيك على إنتاج مواسير ووصلات من الـ بلاستيك القياسية من الـ يو بي في سي (U.P.V.C) وأنبوب PE وفقاً للمواصفات القياسية العالمية لتلبية احتياجات السباكة السكنية والتجارية والمشاريع والآبار وتطبيقات الضغط الأخرى.
            </p>
            <p className="text-silver-700 leading-relaxed mb-4">
              مع استخدامنا لمواد خام عالية الجودة بالإضافة إلى معايير مراقبة الجودة العالية الخاصة بنا. منتجات رويال طبقاً للمواصفات القياسية العالمية.
            </p>
            <p className="text-silver-700 leading-relaxed">
              مصنع الأنوار (رويال) ينتج العديد من المقاسات ابتداءً من 20 ملي إلى 400 ملي بمختلف السماكات والشركات والمنظمات التي تتطلب إحتياجات العملاء.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { num: "+42", label: "سنة خبرة" },
                { num: "+21", label: "محافظة يمنية" },
                { num: "+60", label: "منتج متنوع" },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-silver-200 rounded-xl p-3 text-center">
                  <div className="text-2xl font-extrabold text-royal-700">{s.num}</div>
                  <div className="text-xs text-silver-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/factory-production.jpg"
              alt="مصنع الأنوار للبلاستيك"
              className="rounded-2xl shadow-2xl w-full"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 hidden md:block border border-silver-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-royal-600 text-white flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-royal-900">جودة معتمدة</div>
                  <div className="text-xs text-silver-500">ISO 9001 · BS 18001 · OHSAS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Info */}
        <div className="bg-white rounded-2xl border border-silver-200 p-6 lg:p-8">
          <h2 className="text-2xl font-extrabold text-royal-900 mb-6 text-center">
            منتجات رويال يو بي في سي (U.P.V.C)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-royal-50 rounded-xl p-5">
              <h3 className="font-bold text-royal-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-royal-600" />
                المقاسات الألمانية القياسية
              </h3>
              <p className="text-sm text-silver-700 leading-relaxed">
                مصنع الأنوار (رويال) ينتج العديد من المقاسات لتلبية إحتياجات العملاء والشركات والمنظمات ابتداءً من 20 ملي إلى 400 ملي بمختلف السماكات.
                <br />ومنها أبيض اللون عادي ورمادي اللون جبلة ريل (حلقة مطاط).
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["20mm", "25mm", "32mm", "40mm", "50mm", "63mm", "75mm", "90mm", "110mm", "160mm", "200mm", "400mm"].map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-white text-xs text-royal-700 font-bold border border-royal-200">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-5">
              <h3 className="font-bold text-royal-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-amber-600" />
                المقاسات الأمريكية القياسية
              </h3>
              <p className="text-sm text-silver-700 leading-relaxed">
                مصنع الأنوار (رويال) ينتج العديد من المقاسات ابتداءً من نصف هنش حتى 8 هنش طبقاً للمواصفات الأمريكية القياسية SCH40.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['½"', '¾"', '1"', '1¼"', '1½"', '2"', '3"', '4"', '6"', '8"'].map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-white text-xs text-amber-700 font-bold border border-amber-200" dir="ltr">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mechanical Properties Table */}
        <div className="bg-white rounded-2xl border border-silver-200 p-6 lg:p-8 overflow-x-auto">
          <h2 className="text-2xl font-extrabold text-royal-900 mb-6 text-center">
            المواصفات الميكانيكية للأنابيب
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-royal-600 text-white">
                <th className="p-3 text-right font-bold">الخاصية</th>
                <th className="p-3 text-center font-bold" dir="ltr">الوحدة</th>
                <th className="p-3 text-center font-bold" dir="ltr">القيمة</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "مقاومة الشد Tensile Strength", unit: "kg/cm²", value: "492 - 527" },
                { prop: "قوة التحمل Compressive Strength", unit: "kg/cm²", value: "668 - 680" },
                { prop: "قوة الالتواء (الثني) Flexural Strength", unit: "kg/cm²", value: "950 - 960" },
                { prop: "عامل المرونة Modulus of Elasticity", unit: "kg/cm²", value: "3.2 × 10" },
                { prop: "قوة الصدم (إيزود) Izod Impact Strength", unit: "Joule", value: "4.52 - 4.75" },
                { prop: "قابلية امتصاص الماء Water Absorption", unit: "mg/cm²", value: "< 4" },
                { prop: "عامل الاحتكاك Friction Co-efficient", unit: "Hazen Williams", value: "135 - 150" },
              ].map((row, i) => (
                <tr key={i} className="border-t border-silver-100">
                  <td className="p-3 text-silver-700 font-medium">{row.prop}</td>
                  <td className="p-3 text-center text-silver-500" dir="ltr">{row.unit}</td>
                  <td className="p-3 text-center font-bold text-royal-700" dir="ltr">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vision / Mission */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="w-7 h-7" />,
              title: "الرؤية",
              text: "أن يكون المصنع رائداً في مجال الصناعات البلاستيكية عالية الجودة وتعزيز تواجده في الأسواق المحلية والإقليمية من خلال التركيز على جودة المنتج والابتكار والتطوير والمصداقية مع العملاء.",
              color: "from-blue-500 to-blue-700",
            },
            {
              icon: <Eye className="w-7 h-7" />,
              title: "الرسالة",
              text: "أن تكون منتجات رويال نموذجاً مميزاً للجودة والمواصفات والمقاييس العالمية، وأن نوفر لعملائنا منتجات وخدمات صناعية ذات جودة عالية.",
              color: "from-emerald-500 to-emerald-700",
            },
            {
              icon: <TrendingUp className="w-7 h-7" />,
              title: "الهدف",
              text: "تقديم أفضل المنتجات بجودة عالية ومواصفات ومقاييس عالمية والتوسع على المستوى المحلي والإقليمي لاستقطاب المزيد من العملاء وخلق الرضى لديهم.",
              color: "from-amber-500 to-orange-600",
            },
          ].map((v, i) => (
            <div key={i} className="bg-white rounded-2xl border border-silver-200 p-6 hover:shadow-xl transition">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center mb-4`}>
                {v.icon}
              </div>
              <h3 className="text-xl font-extrabold text-royal-900 mb-3">{v.title}</h3>
              <p className="text-sm text-silver-700 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Why Royal */}
        <div>
          <h2 className="text-2xl font-extrabold text-royal-900 mb-6 text-center">لماذا رويال... الجودة بكل المقاييس</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "البحوث والتطوير", text: "يتطلب المنافسة اليوم في صناعة المواسير من الشركات والمصانع الكبرى أن تلبي إحتياجات العملاء المتغيرة في الأسواق العالمية بإستمرار. لذلك يعتم مصنع رويال بإجراء عمليات البحث والتطوير والتصميم بواسطة كادر وفريق فني متخصص." },
              { title: "التكنولوجيا", text: "يتم استخدام أحدث التقنيات العالمية في عمليات الإنتاج ومراقبة الجودة باستخدام أحدث خطوط الإنتاج والأجهزة العملية إبتداءً من تصميم المنتج حتى التوصيل للعملاء لضمان أعلى معدلات الجودة وتقليل الأخطاء والمشكلات." },
              { title: "الجودة", text: "يتم دعم عمليات الإنتاج لدينا بإستمرار باستخدام نظم جودة معتمدة طبقاً للمواصفات ISO 9001 و ISO 14001 و OHSAS 18001 ويخضع منتجاتنا لمراجعة مستمرة والفحص بنسبة 100% وتشمل جميع أنواع المواسير ومنتجات القطع البلاستيكية." },
              { title: "خدمة العملاء", text: "تعد خدمة العملاء هي محور اهتمامنا الأول لدى إدارة مصنع الأنوار (رويال) ومهدفنا الأول تقديم أفضل الخدمات لعملائنا عن طريق التواصل المستمر معهم في الداخل والخارج ويوجد فريق فني مدرب من إدارة المبيعات لتلبية كافة متطلباتهم المتعلقة بالمنتجات واستخدامها." },
              { title: "السياسة البيئية", text: "يحترم مصنع الأنوار (رويال) البيئة وينعكس هذا الاهتمام في عملياته الإنتاجية حتى يمكننا العيش جميعاً في بيئة صحية، وتمت تعييننا مصنعنا للحصول على شهادة نظام إدارة البيئة للتأكد على إلتزامنا للبيئة في كل العمليات المتعلقة بعملياتنا الإنتاجية." },
              { title: "السلامة والصحة المهنية", text: "يبولي مصنع الأنوار (رويال) إهتماماً كبيراً لسلامة وصحة جميع الموظفين بالمصنع وزائريه حيث أن رأس المال البشري هو مصدر فخر واعتزاز المصنع وعليه يسعى المصنع للحصول على شهادة نظام إدارة السلامة والصحة المهنية طبقاً للمواصفات القياسية OHSAS 18001." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-silver-200 p-5 hover:border-royal-300 transition">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-royal-600 shrink-0" />
                  <h3 className="font-bold text-royal-900">{item.title}</h3>
                </div>
                <p className="text-xs text-silver-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Uses */}
        <div className="bg-white rounded-2xl border border-silver-200 p-6 lg:p-8">
          <h2 className="text-2xl font-extrabold text-royal-900 mb-6 text-center">
            استخدامات منتجات رويال يو بي في سي
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "fa-solid fa-droplet", text: "شبكات الصرف الصحي والمجاري" },
              { icon: "fa-solid fa-house", text: "شبكات مياه الشرب" },
              { icon: "fa-solid fa-wind", text: "شبكات التهوية" },
              { icon: "fa-solid fa-well", text: "آبار وحافظات ومواسير الآبار" },
              { icon: "fa-solid fa-network-wired", text: "شبكة الاتصالات" },
              { icon: "fa-solid fa-bolt", text: "لأغراض تمديدات كيبلات الكهرباء" },
              { icon: "fa-solid fa-garden", text: "أغراض زراعية" },
              { icon: "fa-solid fa-city", text: "التجديد" },
            ].map((u, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-silver-50 hover:bg-royal-50 transition">
                <i className={`${u.icon} text-royal-600 text-lg w-8 text-center`} />
                <span className="text-sm font-medium text-silver-700">{u.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Instructions */}
        <div className="bg-white rounded-2xl border border-silver-200 p-6 lg:p-8">
          <h2 className="text-2xl font-extrabold text-royal-900 mb-6 text-center">تعليمات تخزين المواسير</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-silver-50 rounded-xl p-5">
              <img src="/images/pipes-warehouse.jpg" alt="طريقة الرص" className="w-full rounded-xl mb-4 h-48 object-cover" />
              <h3 className="font-bold text-royal-900 mb-2">طريقة الرص في شكل طبقات</h3>
              <p className="text-xs text-silver-600 leading-relaxed">
                لا يتم تخزين المواسير تحت أشعة الشمس المباشرة. التخزين على أرض مستوية خالية من الحجارة وعلى عوارض خشبية وذلك بطريقة تبادلية الرأس على إستدارة الماسورة.
              </p>
            </div>
            <div className="bg-silver-50 rounded-xl p-5">
              <img src="/images/hero-pipes.jpg" alt="طريقة الرص العكسية" className="w-full rounded-xl mb-4 h-48 object-cover" />
              <h3 className="font-bold text-royal-900 mb-2">طريقة الرص العكسية</h3>
              <p className="text-xs text-silver-600 leading-relaxed">
                يتم تخزين المواسير الأكبر مقاساً في الأسفل في حالة وجود أقطار مختلفة. مراعاة الحذر عند تنزيل المواسير حتى لا تتعرض للسقوط مما يسبب تلف في بداية ونهاية الماسورة.
              </p>
            </div>
          </div>
        </div>

        {/* Manager */}
        <div className="bg-gradient-to-l from-royal-600 to-royal-900 rounded-3xl p-8 text-white text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold mb-2">مسؤول المبيعات</h3>
            <div className="text-xl font-bold text-amber-300 mb-4">{settings.managerName}</div>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-royal-200">المبيعات</div>
                <a href={`tel:${settings.salesPhone}`} dir="ltr" className="font-bold text-lg">{settings.salesPhone}</a>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-royal-200">الاستفسار</div>
                <a href={`tel:${settings.inquiryPhone}`} dir="ltr" className="font-bold text-lg">{settings.inquiryPhone}</a>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-royal-200">الحسابات</div>
                <a href={`tel:${settings.accountsPhone}`} dir="ltr" className="font-bold text-lg">{settings.accountsPhone}</a>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-xs text-royal-200">التوصيل</div>
                <a href={`tel:${settings.deliveryPhone}`} dir="ltr" className="font-bold text-lg">{settings.deliveryPhone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}