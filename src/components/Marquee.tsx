const row1 = [
  { ja: "製造業", es: "Manufactura" },
  { ja: "物流・倉庫", es: "Logística y Almacenes" },
  { ja: "食品関連", es: "Sector Alimentario" },
  { ja: "リサイクル", es: "Reciclaje" },
  { ja: "外国人採用", es: "Contratación de Extranjeros" },
  { ja: "迅速対応", es: "Respuesta Rápida" },
];

const row2 = [
  { ja: "設立29年の信頼と実績", es: "29 Años de Confianza y Trayectoria" },
  { ja: "製造業・物流・食品加工の実績多数", es: "Amplia Experiencia en Manufactura, Logística y Alimentos" },
  { ja: "4言語対応（日本語・英語・スペイン語・ベトナム語）", es: "Atención en 4 Idiomas (Japonés, Inglés, Español, Vietnamita)" },
  { ja: "スピーディーな人材提案", es: "Propuestas de Personal Ágiles" },
  { ja: "寮完備・生活サポート", es: "Dormitorio y Apoyo en la Vida Diaria" },
  { ja: "入社後も安心の定着フォロー", es: "Seguimiento de Adaptación Post-Contratación" },
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
