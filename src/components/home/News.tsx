"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const newsData = [
      {
            id: 1,
            title: "ขอเชิญเข้าร่วมอบรมเตรียมความพร้อมก่อนฮัจญ์ ประจำปี 2568",
            date: "05 July 2025",
            image: "/hajj-training.jpg",
            href: "#",
      },
      {
            id: 2,
            title: "เปิดตัวโครง",
            date: "18 June 2025",
            image: "/jamaah-prayer.jpg",
            href: "#",
      },
      {
            id: 3,
            title: "โครงการพัฒนาตน รุ่นที่ 2: ก้าวสู่ผู้นำยุคใหม่ด้วยศาสนา",
            date: "02 June 2025",
            image: "/leadership.jpg",
            href: "#",
      },
];


const eventsData = [
      {
            id: 1,
            title: "กิจกรรมอีดิลอัฎฮา รวมใจผู้ศรัทธา แจกเนื้อกุรบาน",
            date: "15 July 2025",
      },
      {
            id: 2,
            title: "ดะวะห์ออนทัวร์: เยี่ยมเยียนพี่น้องมุสลิมในชุมชนรอบมหาวิทยาลัย",
            date: "03 August 2025",
      },
];


export function NewsAndEvents() {
      return (
            <section className="max-w-7xl mx-auto py-6">
                  <div className="grid md:grid-cols-3 gap-10">
                        {/* Left: News */}
                        <div className="md:col-span-2">
                              <h2 className="text-2xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                                    ข่าวประชาสัมพันธ์
                              </h2>
                              <div className="grid md:grid-cols-3 gap-6">
                                    {newsData.map((item) => (
                                          <motion.div
                                                key={item.id}
                                                whileHover={{ y: -4 }}
                                                className="rounded-lg border border-blue-100 bg-blue-50 shadow-sm hover:shadow-md transition"
                                          >
                                                <Link href={item.href}>
                                                      <div className="relative w-full h-40 rounded-t-lg overflow-hidden bg-blue-100">
                                                            <Image
                                                                  src={item.image}
                                                                  alt={item.title}
                                                                  fill
                                                                  sizes="(max-width: 768px) 100vw, 600px"
                                                                  className="object-cover"
                                                            />
                                                      </div>
                                                      <div className="p-4">
                                                            <h5 className="font-semibold text-blue-900 text-sm mb-2 line-clamp-2">
                                                                  {item.title}
                                                            </h5>
                                                            <p className="text-xs text-blue-600">{item.date}</p>
                                                      </div>
                                                </Link>
                                          </motion.div>
                                    ))}
                              </div>
                              <div className="flex justify-end">
                                    <Link href="/news">
                                          <div className="py-3 text-sx text-left text-gray-800 border-b-2 border-gray-300 inline-block pb-1 mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-300 cursor-pointer">
                                                ข่าวสารทั้งหมด
                                          </div>
                                    </Link>
                              </div>
                        </div>

                        {/* Right: Events */}
                        <div className="space-y-8">
                              <div>
                                    <h2 className="text-2xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                                          กิจกรรมประจำเดือนนี้
                                    </h2>
                                    <ul className="space-y-4">
                                          {eventsData.map((event, i) => (
                                                <li
                                                      key={event.id}
                                                      className="bg-white border-l-4 border-blue-400 p-4 shadow-sm hover:shadow-md rounded transition"
                                                >
                                                      <h4 className="text-sm font-medium text-blue-700">
                                                            {event.title}
                                                      </h4>
                                                      <p className="text-xs text-blue-500">{event.date}</p>
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        </div>
                  </div>
            </section>
      );
}
