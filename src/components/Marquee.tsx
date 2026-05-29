const row1 = [
  { ja: "人材派遣", es: "Despacho de Personal" },
  { ja: "製造業", es: "Manufactura" },
  { ja: "物流・倉庫", es: "Logística" },
  { ja: "食品加工", es: "Procesamiento de Alimentos" },
  { ja: "外国人労働者支援", es: "Apoyo a Trabajadores Extranjeros" },
  { ja: "一般事務", es: "Administración General" },
  { ja: "キャリアサポート", es: "Desarrollo de Carrera" },
  { ja: "人材管理", es: "Gestión de Recursos Humanos" },
];

const row2 = [
  { ja: "20年以上の実績", es: "20+ Años de Experiencia" },
  { ja: "迅速なマッチング", es: "Emparejamiento Ágil" },
  { ja: "継続的サポート", es: "Soporte Continuo" },
  { ja: "神奈川県相模原市", es: "Sagamihara, Kanagawa" },
  { ja: "派遣許可番号：派14-301314", es: "Lic. N.º 派14-301314" },
  { ja: "日・スペイン語対応", es: "Atención en Japonés y Español" },
  { ja: "社員寮完備", es: "Dormitorio Disponible" },
  { ja: "無償研修制度", es: "Capacitación Gratuita" },
];

function Item({ ja, es, jaOnly }: { ja: string; es: string; jaOnly?: boolean }) {
  return (
    <span className="flex items-center gap-6 mx-6 flex-shrink-0">
      <span className="text-white font-semibold text-sm tracking-wide font-[var(--font-noto)] whitespace-nowrap">
        {ja}
      </span>
      {!jaOnly && (
        <span className="text-[#7CC4E8]/60 text-xs whitespace-nowrap">
          {es}
        </span>
      )}
      <span className="w-1.5 h-1.5 rounded-full bg-[#4A9FD4]/50 flex-shrink-0" />
    </span>
  );
}

function MarqueeRow({ items, direction, jaOnly }: { items: typeof row1; direction: "left" | "right"; jaOnly?: boolean }) {
  const doubled = [...items, ...items];
  const cls = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  const wrap = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className={`${wrap} overflow-hidden`}>
      <div className={`flex ${cls}`}>
        {doubled.map((item, i) => (
          <Item key={i} ja={item.ja} es={item.es} jaOnly={jaOnly} />
        ))}
      </div>
    </div>
  );
}

export default function Marquee({ jaOnly }: { jaOnly?: boolean }) {
  return (
    <div className="section-dark-glass py-5 space-y-4 overflow-hidden">
      <MarqueeRow items={row1} direction="left" jaOnly={jaOnly} />
      <MarqueeRow items={row2} direction="right" jaOnly={jaOnly} />
    </div>
  );
}
