"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { ThreeDMarquee } from "../components/home/ThreeDMarquee";

export default function HomePage() {
  const texts = ["ชมรมมุสลิม ม.อ.หาดใหญ่", "หวังดีดี จากบ้านหลังเดิม"];
  const [index, setIndex] = useState(0);
  const images = Array.from({ length: 32 }, (_, i) => ({
    src: `/Image/${i + 1}.webp`,
    alt: `Image ${i + 1}`,
  }));

  return (
    <main className="relative min-h-screen font-sans overflow-hidden">
      <div className="relative">
        <ThreeDMarquee images={images} imageWidth={20} imageHeight={35} />
        <AnimatePresence mode="wait">
          <motion.div
            key={texts[index]}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            pointer-events-none z-10
            text-white font-black
            text-4xl sm:text-6xl lg:text-7xl
            tracking-wide
            select-none
            drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]
            px-6 py-3
            bg-black bg-opacity-60
            rounded-lg
            max-w-[95vw]
            whitespace-nowrap
            overflow-visible
            text-center
          "
          >
            {texts[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}