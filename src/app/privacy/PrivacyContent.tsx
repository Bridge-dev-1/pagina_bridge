"use client";

import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/translations";

const ja = {
  back: "トップへ戻る",
  lang: "ES",
  title: "個人情報保護方針",
  subtitle: "株式会社ブリッジサービス",
  updated: "最終更新日：2024年6月1日",
  intro: "株式会社ブリッジサービス（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、個人情報の保護に関する法律（個人情報保護法）およびその他関連法令を遵守し、以下の方針に従って個人情報を適切に取り扱います。",
  sections: [
    {
      title: "1. 個人情報の収集について",
      content: "当社は、以下の場合に個人情報を収集することがあります。\n・お問い合わせフォームからのご連絡\n・求職者の登録・エントリー\n・取引先企業との契約手続き\n・当社サービスのご利用\n\n収集する個人情報は、氏名、住所、電話番号、メールアドレス、生年月日、職歴・資格等、業務に必要な情報に限定します。",
    },
    {
      title: "2. 個人情報の利用目的",
      content: "収集した個人情報は、以下の目的のために利用します。\n・人材派遣サービスの提供および管理\n・求人情報・サービス情報のご案内\n・雇用契約・労働条件の管理\n・給与計算・社会保険手続き\n・各種ご相談・お問い合わせへの対応\n・法令に基づく義務の履行\n\n上記以外の目的には、お客様の同意なく利用いたしません。",
    },
    {
      title: "3. 個人情報の第三者提供",
      content: "当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。\n・お客様の事前の同意がある場合\n・法令に基づく場合\n・人の生命、身体または財産の保護のために必要がある場合\n・派遣先企業への業務遂行に必要な範囲での提供\n\n第三者提供を行う場合は、適切な契約のもとで情報管理を行います。",
    },
    {
      title: "4. 個人情報の管理・安全措置",
      content: "当社は、個人情報の漏洩、滅失、毀損等を防止するため、以下の安全管理措置を実施します。\n・アクセス権限の管理と制限\n・従業員への個人情報保護教育の実施\n・個人情報を含む書類の適切な保管・廃棄\n・セキュリティシステムの導入と定期的な見直し\n\n万が一、個人情報の漏洩等が発生した場合は、速やかに監督官庁への報告およびお客様へのご連絡を行います。",
    },
    {
      title: "5. 個人情報の開示・訂正・削除",
      content: "お客様は、当社が保有するご自身の個人情報について、開示・訂正・追加・削除・利用停止・消去および第三者への提供の停止を請求する権利を有します。\n\nご請求の際は、本人確認のうえ、合理的な期間内に対応いたします。法令に基づき開示等ができない場合はその旨をお知らせします。",
    },
    {
      title: "6. Cookieの使用について",
      content: "当社ウェブサイトでは、サービス向上のためにCookieを使用することがあります。Cookieはお客様のウェブブラウザに保存される小さなデータファイルです。\n\nブラウザの設定によりCookieを無効にすることができますが、一部のサービスが正常に動作しない場合があります。",
    },
    {
      title: "7. お問い合わせ窓口",
      content: "個人情報の取り扱いに関するお問い合わせ・ご相談・苦情等は、以下の窓口までご連絡ください。\n\n個人情報保護管理者\n株式会社ブリッジサービス\n〒252-0311 神奈川県相模原市南区東林間5-18-13 1F\nTEL: 042-865-3560\nEmail: info@bridgeservice.co.jp\n受付時間：平日 9:00〜18:00",
    },
    {
      title: "8. プライバシーポリシーの変更",
      content: "本方針は、法令の改正やサービスの変更等に伴い、予告なく変更することがあります。変更後の方針は、本ページに掲載した時点から効力を生じるものとします。\n\n重要な変更を行う場合は、ウェブサイト上でお知らせします。",
    },
  ],
};

const es = {
  back: "Volver al inicio",
  lang: "日本語",
  title: "Política de Privacidad",
  subtitle: "Bridge Service Co., Ltd. / 株式会社ブリッジサービス",
  updated: "Última actualización: 1 de junio de 2024",
  intro: "Bridge Service Co., Ltd. (en adelante \"la Empresa\") considera la protección de los datos personales de sus clientes como una responsabilidad fundamental. Cumplimos con la Ley de Protección de Información Personal de Japón (APPI) y demás normativas aplicables, gestionando los datos personales conforme a la siguiente política.",
  sections: [
    {
      title: "1. Recopilación de Datos Personales",
      content: "La Empresa puede recopilar datos personales en las siguientes situaciones:\n· Contacto a través del formulario de consultas\n· Registro de candidatos y solicitudes de empleo\n· Procedimientos contractuales con empresas clientes\n· Uso de los servicios de la Empresa\n\nLos datos recopilados se limitan a los necesarios para la operación: nombre, dirección, teléfono, correo electrónico, fecha de nacimiento, historial laboral, calificaciones y otros datos relacionados con el servicio.",
    },
    {
      title: "2. Finalidad del Uso",
      content: "Los datos personales recopilados se utilizarán para los siguientes fines:\n· Prestación y gestión de servicios de despacho de personal\n· Información sobre ofertas de empleo y servicios\n· Gestión de contratos laborales y condiciones de trabajo\n· Cálculo de salarios y trámites de seguro social\n· Atención de consultas y solicitudes\n· Cumplimiento de obligaciones legales\n\nNo utilizaremos los datos para ningún otro fin sin el consentimiento previo del interesado.",
    },
    {
      title: "3. Divulgación a Terceros",
      content: "La Empresa no proporcionará datos personales a terceros, salvo en los siguientes casos:\n· Con el consentimiento previo del interesado\n· Cuando lo exija la ley\n· Cuando sea necesario para proteger la vida, el cuerpo o los bienes de una persona\n· Cuando sea necesario para la ejecución del servicio de despacho a la empresa contratante\n\nEn caso de transferencia a terceros, se realizará bajo contratos apropiados de gestión de datos.",
    },
    {
      title: "4. Gestión y Medidas de Seguridad",
      content: "Para prevenir la filtración, pérdida o deterioro de los datos personales, la Empresa implementa las siguientes medidas:\n· Gestión y restricción de permisos de acceso\n· Capacitación del personal en protección de datos\n· Almacenamiento y eliminación adecuados de documentos con datos personales\n· Implementación y revisión periódica de sistemas de seguridad\n\nEn caso de que ocurra una filtración de datos, notificaremos a las autoridades competentes y a los afectados de manera oportuna.",
    },
    {
      title: "5. Derechos del Interesado",
      content: "Los interesados tienen derecho a solicitar el acceso, corrección, adición, eliminación, suspensión del uso y cancelación de sus datos personales en poder de la Empresa, así como la suspensión de su transferencia a terceros.\n\nPara ejercer estos derechos, verificaremos su identidad y responderemos en un plazo razonable. Si no podemos cumplir con la solicitud por razones legales, se lo comunicaremos.",
    },
    {
      title: "6. Uso de Cookies",
      content: "El sitio web de la Empresa puede utilizar cookies para mejorar el servicio. Las cookies son pequeños archivos de datos almacenados en el navegador del usuario.\n\nPuede desactivar las cookies desde la configuración de su navegador; sin embargo, es posible que algunos servicios no funcionen correctamente.",
    },
    {
      title: "7. Contacto para Consultas",
      content: "Para consultas, sugerencias o quejas relacionadas con el tratamiento de datos personales, comuníquese con:\n\nResponsable de Protección de Datos Personales\nBridge Service Co., Ltd.\n〒252-0311 1F, 5-18-13 Higashirinkan, Minami Ward, Sagamihara, Kanagawa\nTEL: 042-865-3560\nEmail: info@bridgeservice.co.jp\nHorario de atención: Lunes a viernes, 9:00–18:00",
    },
    {
      title: "8. Modificaciones a esta Política",
      content: "Esta política puede ser modificada sin previo aviso debido a cambios en la legislación o en los servicios. Las modificaciones entrarán en vigor desde el momento de su publicación en esta página.\n\nEn caso de cambios importantes, se notificará a través del sitio web.",
    },
  ],
};

export default function PrivacyContent() {
  const { lang, setLang } = useLang();
  const c = lang === "ja" ? ja : es;
  const otherLang: Lang = lang === "ja" ? "es" : "ja";

  return (
    <div className="min-h-screen gradient-section">
      {/* Top bar */}
      <div className="bg-[#0f2347] py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} />
            <span>{c.back}</span>
          </Link>
          <button
            onClick={() => setLang(otherLang)}
            className="text-xs font-semibold border border-white/30 text-white/70 hover:text-white px-3 py-1.5 rounded-full transition-colors"
          >
            {c.lang}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A6B] to-[#4A9FD4] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text font-[var(--font-noto)]">
                {c.title}
              </h1>
              <p className="text-gray-400 text-sm font-[var(--font-noto)]">{c.subtitle}</p>
            </div>
          </div>
          <div className="w-12 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] rounded-full mb-4" />
          <p className="text-xs text-gray-400 font-[var(--font-noto)]">{c.updated}</p>
        </div>

        {/* Intro */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
          <p className="text-[#1B3A6B] text-sm leading-relaxed font-[var(--font-noto)]">
            {c.intro}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4]" />
              <div className="p-6">
                <h2 className="text-base font-bold text-[#1B3A6B] mb-3 font-[var(--font-noto)]">
                  {s.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line font-[var(--font-noto)]">
                  {s.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-400 font-[var(--font-noto)] mb-4">
            {lang === "ja"
              ? "株式会社ブリッジサービス　許可番号：派14-301314"
              : "Bridge Service Co., Ltd.　Lic. N.º：派14-301314"}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#4A9FD4] hover:text-[#1B3A6B] text-sm font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            {c.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
