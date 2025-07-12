"use client";

// Components
import { ThreeDMarquee } from "../components/home/ThreeDMarquee";

export default function HomePage() {
  const images = Array.from({ length: 32 }, (_, i) => ({
    src: `/Image/${i + 1}.webp`,
    alt: `Image ${i + 1}`,
  }));

  return (
    <main className="relative min-h-screen font-sans overflow-hidden">
      <div className="relative">
        <ThreeDMarquee images={images} imageWidth={20} imageHeight={35} />
      </div>
    </main>
  );
}