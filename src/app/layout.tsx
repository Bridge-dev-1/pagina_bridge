import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { LangProvider } from "@/contexts/LangContext";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bridge Service | 株式会社ブリッジサービス",
  description:
    "人材派遣・人材管理サポート事業。人材と企業をつなぐ架け橋として、20年以上の実績。A bridge to the future.",
  keywords: "人材派遣, 職業紹介, 外国人労働者, 相模原, Bridge Service",
  other: {
    "google": "notranslate",
  },
  openGraph: {
    title: "Bridge Service | 株式会社ブリッジサービス",
    description: "人材と企業をつなぐ架け橋として。A bridge to the future.",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" translate="no" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <SmoothScroll>
            <PageTransition>{children}</PageTransition>
          </SmoothScroll>
        </LangProvider>
      </body>
    </html>
  );
}
