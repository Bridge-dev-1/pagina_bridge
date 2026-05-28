import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "個人情報保護方針 | Bridge Service",
  description: "株式会社ブリッジサービスの個人情報保護方針 · Política de Privacidad de Bridge Service Co., Ltd.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
