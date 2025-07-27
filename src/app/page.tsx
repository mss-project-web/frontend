"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

// Components
import { ThreeDMarquee } from "../components/home/ThreeDMarquee";
import { AnimatedCounterPage } from "@/components/home/AnimatedCounter";
import { NewsAndEvents } from "@/components/home/News";
import { EventHome } from "@/components/home/EventHome";
import { PresidentContens } from "@/components/home/PresidentContens";
import { JoinUsSection } from "../components/home/JoinUsSection";

export default function HomePage() {
  const texts = ["ชมรมมุสลิม ม.อ.หาดใหญ่", "หวังดีดี จากบ้านหลังเดิม"];
  const [index, setIndex] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const images = Array.from({ length: 32 }, (_, i) => ({
    src: `/Image/${i + 1}.webp`,
    alt: `Image ${i + 1}`,
  }));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen font-sans overflow-hidden bg-white">
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
            absolute inset-0 flex items-center justify-center
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            font-extrabold text-white text-center
            shadow-sky-500/50
            leading-tight tracking-tight
            z-10 px-4 md:px-8 pointer-events-none
            drop-shadow-[0_0_4px_#00BFFF]
            [text-shadow:0_0_2px_#00BFFF,0_0_2px_#00BFFF,0_0_2px_#00BFFF]
          "
          > {texts[index]}
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

      {/* NewsAndEvents */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-screen-xl px-4">
          <NewsAndEvents />
          <EventHome />
        </div>
      </div>

      {/* PresidentContens */}
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <h2 className="text-2xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
          จากใจพี่...ถึงน้อง
        </h2>
        <PresidentContens />
      </div>

      {/* JoinUsSection */}
      <div className="p-0">
        <JoinUsSection />
      </div>


      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}