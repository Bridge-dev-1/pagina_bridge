import type { Metadata } from "next";
import MargenContent from "./MargenContent";

export const metadata: Metadata = {
  title: "Porcentaje de Margen | Bridge Service",
  description: "マージン率等の情報提供 — 株式会社ブリッジサービス",
};

export default function MargenPage() {
  return <MargenContent />;
}
