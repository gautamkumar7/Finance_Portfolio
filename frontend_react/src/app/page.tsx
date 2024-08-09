import Hero from "@/components/ui/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen overflow-y-hidden flex-col items-center justify-between p-24">
      <Hero />
    </main>
  );
}
