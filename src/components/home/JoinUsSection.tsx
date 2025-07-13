"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function JoinUsSection() {
      return (
            <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-200 text-white relative overflow-hidden">
                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="max-w-3xl mx-auto px-4 text-center"
                  >
                        <div className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Kanit, sans-serif" }}>
                              พร้อมเข้าร่วมกับเราแล้วหรือยัง
                        </div>
                        <p className="text-xl mb-8 text-gray-100" style={{ fontFamily: "Kanit, sans-serif" }}>
                              มาร่วมเป็นส่วนหนึ่งของครอบครัวชมรมมุสลิม และสร้างความทรงจำดีๆ ไปด้วยกัน
                        </p>
                        <div className="mt-8">
                              <Link
                                    href="contact"
                                    className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition"
                              >
                                    ติดต่อเรา
                              </Link>
                        </div>
                  </motion.div>
            </section>
      );
}
