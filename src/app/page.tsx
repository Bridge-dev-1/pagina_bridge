import PageScene from "@/components/PageScene";
import Hero from "@/components/Hero";
import LineButton from "@/components/LineButton";

export default function Home() {
  return (
    <main className="relative" style={{ zIndex: 1 }}>
      <PageScene />
      <Hero />
      <LineButton />
    </main>
  );
}
