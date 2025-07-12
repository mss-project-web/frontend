"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { ThreeDMarquee } from "../components/home/ThreeDMarquee";
import { AnimatedCounterPage } from "@/components/home/AnimatedCounter";

export default function HomePage() {
  const texts = ["ชมรมมุสลิม ม.อ.หาดใหญ่", "หวังดีดี จากบ้านหลังเดิม"];
  const [index, setIndex] = useState(0);
  const images = Array.from({ length: 32 }, (_, i) => ({
    src: `/Image/${i + 1}.webp`,
    alt: `Image ${i + 1}`,
  }));

  const WavePattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(96, 165, 250, 0.05) 0%, transparent 50%)
          `,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );

  return (
    <main className="relative min-h-screen font-sans overflow-hidden">
      {/* BG */}
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

      {/* AnimatedCounterPage */}
      <div className="relative bg-gradient-to-r from-blue-100 via-sky-50 to-blue-200 overflow-hidden">
        <WavePattern />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4">
          <AnimatedCounterPage />
        </div>
      </div>
    </main>
  );
}