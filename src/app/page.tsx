import Hero from "@/components/Hero";
import LineButton from "@/components/LineButton";

export default function Home() {
  return (
    <main className="relative" style={{ zIndex: 1 }}>
      <Hero />
      <LineButton />
    </main>
  );
}
