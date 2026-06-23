"use client";

import Link from "next/link";
import { ArrowLeft, Download, Users, Building2, TrendingUp, Wallet, CheckCircle2, GraduationCap, Heart } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/lib/translations";

const ja = {
  back: "トップへ戻る",
  title: "マージン率等の情報提供について",
  subtitle: "株式会社ブリッジサービス　許可番号：派14-301314",
  download: "PDFダウンロード",
  metrics: [
    { icon: Users, num: "82人", label: "派遣労働者数", note: "令和6年6月1日付け" },
    { icon: Building2, num: "10社", label: "派遣先事業所数", note: "令和年度（実数）" },
    { icon: TrendingUp, num: "18,016円", label: "派遣料金平均額", note: "8時間 全業務平均（令和5年度）" },
    { icon: Wallet, num: "12,344円", label: "派遣労働者賃金平均額", note: "8時間 全業務平均（令和5年度）" },
  ],
  marginTitle: "マージン率（令和5年度）",
  marginRate: "31.5%",
  marginFormula: "マージン率 ＝（派遣料金平均額 − 賃金平均額）÷ 派遣料金平均額",
  marginCalc: "（18,016円 − 12,344円）÷ 18,016円 ≒ 31.5%",
  agreementTitle: "労働者派遣法第30条の4第1項の労使協定",
  agreementStatus: "締結している",
  agreementScope: "対象となる派遣労働者の範囲",
  agreementScopeVal: "全ての派遣労働者",
  agreementExpiry: "有効期間の終期",
  agreementExpiryVal: "令和7年3月31日",
  trainingTitle: "派遣労働者のキャリア形成支援制度",
  trainingNote: "キャリアアップに資する教育訓練に関する計画内容",
  trainingCols: ["訓練種別", "対象者", "訓練方法", "費用", "賃金"],
  trainingRows: [
    ["新入派遣社員研修", "入社1年未満", "OFF-JT", "無償", "有給"],
    ["中堅派遣社員研修", "入社2年目", "OFF-JT", "無償", "有給"],
    ["上級派遣社員研修", "入社3年目", "OFF-JT", "無償", "有給"],
    ["リーダー派遣社員研修", "入社4年目以降", "OFF-JT", "無償", "有給"],
  ],
  consultingLabel: "キャリア・コンサルティング相談窓口",
  consultingVal: "キャリアコンサルティング担当　TEL: 042-865-3560",
  benefitsTitle: "福利厚生",
  benefitsVal: "社員寮あり（条件あり）",
  legalNote: "労働者派遣法第23条の2の規定に基づき情報を公開しております。",
};

const es = {
  back: "Volver al inicio",
  title: "Información sobre el Porcentaje de Margen",
  subtitle: "Bridge Service Co., Ltd.　Lic. N.º：派14-301314",
  download: "Descargar PDF",
  metrics: [
    { icon: Users, num: "82", label: "Trabajadores despachados", note: "Al 1 de junio de 2024" },
    { icon: Building2, num: "10", label: "Empresas cliente", note: "Año fiscal (cantidad real)" },
    { icon: TrendingUp, num: "¥18,016", label: "Tarifa promedio de despacho", note: "8 horas, promedio general (2023)" },
    { icon: Wallet, num: "¥12,344", label: "Salario promedio del trabajador", note: "8 horas, promedio general (2023)" },
  ],
  marginTitle: "Porcentaje de Margen (2023)",
  marginRate: "31.5%",
  marginFormula: "Margen = (Tarifa de despacho − Salario del trabajador) ÷ Tarifa de despacho",
  marginCalc: "(¥18,016 − ¥12,344) ÷ ¥18,016 ≒ 31.5%",
  agreementTitle: "Acuerdo Laboral-Empresarial (Art. 30-4, párr. 1)",
  agreementStatus: "Acuerdo concluido",
  agreementScope: "Trabajadores cubiertos por el acuerdo",
  agreementScopeVal: "Todos los trabajadores despachados",
  agreementExpiry: "Fecha de vencimiento",
  agreementExpiryVal: "31 de marzo de 2025",
  trainingTitle: "Plan de Desarrollo de Carrera",
  trainingNote: "Plan de capacitación para el avance profesional",
  trainingCols: ["Tipo de capacitación", "Destinatarios", "Método", "Costo", "Salario"],
  trainingRows: [
    ["Inducción nuevos trabajadores", "Menos de 1 año", "OFF-JT", "Gratuito", "Con goce"],
    ["Capacitación nivel intermedio", "2.º año", "OFF-JT", "Gratuito", "Con goce"],
    ["Capacitación nivel avanzado", "3.er año", "OFF-JT", "Gratuito", "Con goce"],
    ["Capacitación para líderes", "Desde el 4.º año", "OFF-JT", "Gratuito", "Con goce"],
  ],
  consultingLabel: "Asesoría de Desarrollo Profesional",
  consultingVal: "Responsable de Career Consulting　TEL: 042-865-3560",
  benefitsTitle: "Beneficios Adicionales",
  benefitsVal: "Dormitorio de empresa disponible (con condiciones)",
  legalNote: "Información publicada conforme al Art. 23-2 de la Ley de Despacho de Trabajadores.",
};

export default function MargenContent() {
  const { lang, setLang } = useLang();
  const c = lang === "ja" ? ja : es;
  const otherLang: Lang = lang === "ja" ? "es" : "ja";

  return (
    <div className="min-h-screen gradient-section">
      <div className="bg-[#0f2347] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft size={15} />
            <span>{c.back}</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(otherLang)}
              className="text-xs font-semibold border border-white/30 text-white/70 hover:text-white px-3 py-1.5 rounded-full transition-colors"
            >
              {lang === "ja" ? "ES" : "日本語"}
            </button>
            <a
              href="/porcentaje_de_margen.pdf"
              download
              className="flex items-center gap-2 bg-[#4A9FD4] hover:bg-[#7CC4E8] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              <Download size={13} />
              <span>{c.download}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6 md:space-y-8">
        <div>
          <span className="text-[#4A9FD4] text-xs font-semibold tracking-[0.25em] uppercase block mb-2">
            Transparency · マージン率
          </span>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold gradient-text mb-2 font-[var(--font-noto)] text-balance break-keep">
            {c.title}
          </h1>
          <p className="text-gray-400 text-sm font-[var(--font-noto)]">{c.subtitle}</p>
          <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4] rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {c.metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50 text-center card-hover">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1B3A6B] to-[#4A9FD4] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-white" />
                </div>
                <p className="text-2xl font-black gradient-text leading-tight">{m.num}</p>
                <p className="text-[#1B3A6B] font-semibold text-xs mt-1 font-[var(--font-noto)]">{m.label}</p>
                <p className="text-gray-400 text-xs mt-0.5 font-[var(--font-noto)]">{m.note}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-[#1B3A6B] to-[#2a5298] rounded-3xl p-8 text-white">
          <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-2">{c.marginTitle}</p>
          <div className="flex items-end gap-4 mb-6">
            <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7CC4E8] to-white">
              {c.marginRate}
            </span>
            <TrendingUp size={32} className="text-white/40 mb-3" />
          </div>
          <div className="bg-white/10 rounded-2xl p-4 space-y-1">
            <p className="text-white/70 text-xs font-[var(--font-noto)]">{c.marginFormula}</p>
            <p className="text-white font-semibold text-sm font-[var(--font-noto)]">{c.marginCalc}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4]" />
          <div className="p-7">
            <h2 className="text-lg font-bold text-[#1B3A6B] mb-5 font-[var(--font-noto)] flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#4A9FD4]" />
              {c.agreementTitle}
            </h2>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <CheckCircle2 size={14} />
              {c.agreementStatus}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1 font-[var(--font-noto)]">{c.agreementScope}</p>
                <p className="text-[#1B3A6B] font-bold font-[var(--font-noto)]">{c.agreementScopeVal}</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1 font-[var(--font-noto)]">{c.agreementExpiry}</p>
                <p className="text-[#1B3A6B] font-bold font-[var(--font-noto)]">{c.agreementExpiryVal}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4]" />
          <div className="p-7">
            <h2 className="text-lg font-bold text-[#1B3A6B] mb-1 font-[var(--font-noto)] flex items-center gap-2">
              <GraduationCap size={20} className="text-[#4A9FD4]" />
              {c.trainingTitle}
            </h2>
            <p className="text-gray-400 text-xs mb-5 font-[var(--font-noto)]">{c.trainingNote}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1B3A6B] to-[#2a5298]">
                    {c.trainingCols.map((col) => (
                      <th key={col} className="text-left text-white font-semibold px-4 py-3 text-xs font-[var(--font-noto)] whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.trainingRows.map((row, i) => (
                    <tr key={i} className={`border-b border-gray-50 hover:bg-blue-50/40 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`px-4 py-3 font-[var(--font-noto)] text-xs ${j === 0 ? "font-semibold text-[#1B3A6B]" : "text-gray-600"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 p-4 bg-blue-50 rounded-2xl">
              <p className="text-xs font-bold text-[#4A9FD4] uppercase tracking-widest mb-1">{c.consultingLabel}</p>
              <p className="text-[#1B3A6B] font-semibold text-sm font-[var(--font-noto)]">{c.consultingVal}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#1B3A6B] to-[#4A9FD4]" />
          <div className="p-7 flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1B3A6B] to-[#4A9FD4] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#4A9FD4] uppercase tracking-widest mb-1">{c.benefitsTitle}</p>
              <p className="text-[#1B3A6B] font-semibold font-[var(--font-noto)]">{c.benefitsVal}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 font-[var(--font-noto)] pb-4">{c.legalNote}</p>
      </div>
    </div>
  );
}
