"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2000,
  className = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      const steps = 60;
      const stepTime = duration / steps;
      let current = from;
      const increment = (to - from) / steps;

      const interval = setInterval(() => {
        current += increment;
        if (current >= to) {
          current = to;
          clearInterval(interval);
        }
        setCount(Math.floor(current));
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [isInView, from, to, duration]);

  return (
    <div
      ref={ref}
      className={`text-5xl sm:text-6xl font-bold text-blue-700 ${className}`}
    >
      {count}
    </div>
  );
};

export function AnimatedCounterPage() {
  const memberCount = 120;
  const pastEvents = 20;
  const foundedYear = 2521;
  const volunteers = 100;

  return (
    <section className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <AnimatedCounter to={memberCount} />
            <p className="mt-2 text-gray-600">สมาชิกชมรม</p>
          </div>
          <div>
            <AnimatedCounter to={pastEvents} />
            <p className="mt-2 text-gray-600">กิจกรรมที่ผ่านมา</p>
          </div>
          <div>
            <AnimatedCounter to={foundedYear} />
            <p className="mt-2 text-gray-600">ก่อตั้งเมื่อ</p>
          </div>
          <div>
            <AnimatedCounter to={volunteers} />
            <p className="mt-2 text-gray-600">อาสาสมัคร</p>
          </div>
        </div>
      </div>
    </section>
  );
}
