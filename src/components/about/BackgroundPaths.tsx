// components/about/StorySectionBackground.tsx
"use client";

import { motion } from "framer-motion";

function FloatingPathsStory({ position }: { position: number }) {
  const paths = Array.from({ length: 25 }, (_, i) => ({ // ลดจำนวน path ลงเพื่อให้ดูไม่รกเกินไป
    id: i,
    d: `M-${200 - i * 3 * position} -${100 + i * 4}C-${ // ปรับค่า d เพื่อให้ขนาดและรูปทรงเหมาะสม
      200 - i * 3 * position
    } -${100 + i * 4} -${150 - i * 3 * position} ${100 - i * 4} ${
      80 - i * 3 * position
    } ${150 - i * 4}C${300 - i * 3 * position} ${200 - i * 4} ${
      350 - i * 3 * position
    } ${400 - i * 4} ${350 - i * 3 * position} ${400 - i * 4}`,
    color: `rgba(0, 100, 255, ${0.05 + i * 0.02})`, // ปรับสีและความทึบให้เข้ากับโทนสีฟ้าของ section
    width: 0.3 + i * 0.02, // ปรับความหนา
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-blue-500 dark:text-blue-300" viewBox="0 0 400 200" fill="none">
        <title>Story Section Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.05 + path.id * 0.02} // ปรับความทึบ
            initial={{ pathLength: 0.2, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.4, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 8, // ปรับความเร็ว
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function StorySectionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <FloatingPathsStory position={1} />
      <FloatingPathsStory position={-1} />
    </div>
  );
}