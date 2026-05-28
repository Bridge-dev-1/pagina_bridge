import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Services from "@/components/Services";
import Attorneys from "@/components/Attorneys";
import MapContact from "@/components/MapContact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import LineButton from "@/components/LineButton";
import ScrollProgress from "@/components/ScrollProgress";
import Marquee from "@/components/Marquee";
import PageScene from "@/components/PageScene";

export default function Home() {
  return (
    <>
      <PageScene />
      <Navbar />
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <Marquee />
        <SectionDivider />
        <Vision />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Attorneys />
        <SectionDivider />
        <MapContact />
      </main>
      <Footer />
      <BackToTop />
      <LineButton />
      <ScrollProgress />
    </>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-[#4A9FD4]/25 to-transparent" />
    </div>
  );
}
