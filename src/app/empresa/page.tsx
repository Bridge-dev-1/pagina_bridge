import type { Metadata } from "next";
import EmpresaContent from "./EmpresaContent";

export const metadata: Metadata = {
  title: "Bridge Service | 企業様へ | 人材派遣・HR支援",
  description:
    "企業の人材ニーズに応える人材派遣・人材管理サポートサービス。20年以上の実績で最適な人材をご提供します。",
};

export default function EmpresaPage() {
  return <EmpresaContent />;
}
