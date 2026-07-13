"use client";

import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import HomePageStructuredData from "@/components/home/HomePageStructuredData";
import SiteNavigationStructuredData from "@/components/SiteNavigationStructuredData";
import { useEventListener, useDebounce, useMemoryMonitor } from "@/lib/utils/memoryOptimization";

// Lazy load heavy components with proper error boundaries
const ThreeDMarquee = lazy(() => import("../components/home/ThreeDMarquee").then(module => ({ default: module.ThreeDMarquee })));
const AnimatedCounterPage = lazy(() => import("@/components/home/AnimatedCounter").then(module => ({ default: module.AnimatedCounterPage })));
const NewsAndEvents = lazy(() => import("@/components/home/News").then(module => ({ default: module.NewsAndEvents })));
const EventHome = lazy(() => import("@/components/home/EventHome").then(module => ({ default: module.EventHome })));
const JoinUsSection = lazy(() => import("../components/home/JoinUsSection").then(module => ({ default: module.JoinUsSection })));
const BlogHome = lazy(() => import("../components/home/BlogHome").then(module => ({ default: module.BlogHome })));

export default function HomePage() {
  // Memory monitoring (development only)
  useMemoryMonitor('HomePage');
  
  const texts = ["ชมรมมุสลิม ม.อ.หาดใหญ่", "หวังดีดี จากบ้านหลังเดิม"];
  const [index, setIndex] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Memoize images array to prevent recreation on every render
  const images = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => ({
      src: `/Image/${i + 1}.webp`,
      alt: `Image ${i + 1}`,
    })), []
  );

  // Debounced scroll handler to reduce memory usage
  const debouncedScrollHandler = useDebounce(() => {
    if (typeof window !== 'undefined') {
      setShowScrollToTop(window.scrollY > 300);
    }
  }, 100);

  // Use optimized event listener (only in browser)
  useEventListener("scroll", debouncedScrollHandler);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
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
      {/* SEO: single, stable H1 (visually hidden; the hero shows animated text) */}
      <h1 className="sr-only">
        ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ (MSS PSU Hatyai) — กิจกรรม ข่าวสาร และห้องละหมาดสำหรับนักศึกษามุสลิม
      </h1>

      {/* Structured Data for SEO */}
      <HomePageStructuredData />
      <SiteNavigationStructuredData />
      
      {/* BG */}
      <div className="relative">
        <Suspense fallback={<div className="h-[700px] max-sm:h-[500px] bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 animate-pulse" />}>
          <ThreeDMarquee images={images} imageWidth={20} imageHeight={35} />
        </Suspense>
        
        {/* SEO-friendly Header Structure */}
        <header className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={texts[index]}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 1.05 }}
              transition={{ duration: 1.5 }}
              className="
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                font-extrabold text-white text-center
                shadow-black/50
                leading-tight tracking-tight
                pointer-events-none
                drop-shadow-[0_0_6px_#000000]
                [text-shadow:0_0_4px_#000000,0_0_2px_#000000,0_0_2px_#000000]
                mb-4
              "
            > 
              {texts[index]}
            </motion.div>
          </AnimatePresence>
        </header>
      </div>

      {/* Statistics Section */}
      <section className="relative bg-gradient-to-r from-blue-100 via-sky-50 to-blue-200 overflow-hidden">
        <WavePattern />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4">
          <Suspense fallback={<div className="h-64 bg-white/20 rounded-lg animate-pulse" />}>
            <AnimatedCounterPage />
          </Suspense>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="relative overflow-hidden py-16">
        <div className="relative z-10 mx-auto max-w-screen-xl px-4">
          <Suspense fallback={<div className="h-96 bg-gray-100 rounded-lg animate-pulse mb-8" />}>
            <NewsAndEvents />
          </Suspense>
          <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse" />}>
            <EventHome />
          </Suspense>
          <Suspense fallback={<div className="h-96 bg-gray-100 rounded-lg animate-pulse my-8" />}>
            <BlogHome />
          </Suspense>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="p-0">
        <header className="sr-only">
          <h2>เข้าร่วมกับเรา</h2>
          <p>ข้อมูลการเข้าร่วมกิจกรรมและเป็นสมาชิกชมรมมุสลิม</p>
        </header>
        <Suspense fallback={<div className="h-96 bg-blue-50 animate-pulse" />}>
          <JoinUsSection />
        </Suspense>
      </section>

      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="animate-bounce fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 z-50"
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