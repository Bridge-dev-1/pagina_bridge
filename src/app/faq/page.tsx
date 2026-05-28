import type { Metadata } from "next";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "よくある質問 | Bridge Service",
  description: "株式会社ブリッジサービスのよくある質問 · Preguntas Frecuentes de Bridge Service Co., Ltd.",
};

export default function FAQPage() {
  return <FAQContent />;
}
