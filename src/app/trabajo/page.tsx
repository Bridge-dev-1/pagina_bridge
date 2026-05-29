import type { Metadata, Viewport } from "next";
import TrabajoContent from "./TrabajoContent";

export const metadata: Metadata = {
  title: "仕事を探す / Busco Trabajo | Bridge Service",
  description: "求職登録 · Registra tus datos y un representante de Bridge Service te contactará.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function TrabajoPage() {
  return <TrabajoContent />;
}
