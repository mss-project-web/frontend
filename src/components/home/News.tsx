"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"; 
import { Skeleton } from '@/components/ui/skeleton';

// --- News Card Skeleton (วางไว้ด้านบนหรือในไฟล์แยก) ---
function NewsCardSkeleton() {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 shadow-sm transition">
      <div className="relative w-full h-40 rounded-t-lg overflow-hidden bg-blue-100">
        <Skeleton className="w-full h-full rounded-t-lg bg-gray-200" />
      </div>
      <div className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2 bg-gray-200" />
        <Skeleton className="h-3 w-1/2 bg-gray-200" />
      </div>
    </div>
  );
}

// --- Event Item Skeleton (วางไว้ด้านบนหรือในไฟล์แยก) ---
function EventItemSkeleton() {
  return (
    <li className="bg-white border-l-4 border-blue-400 p-4 shadow-sm rounded transition">
      <div>
        <Skeleton className="h-3 w-2/3 mb-1 bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-7 w-32 rounded-md bg-gray-200" />
      </div>
    </li>
  );
}

// --- Data (ย้ายไปอยู่ด้านใน NewsAndEvents หรือ fetch มาจาก API) ---
const mockNewsData = [
    {
        id: 1,
        title: "ขอเชิญเข้าร่วมอบรมเตรียมความพร้อมก่อนฮัจญ์ ประจำปี 2568",
        date: "05 July 2025",
        image: "/hajj-training.jpg",
        href: "#",
    },
    {
        id: 2,
        title: "เปิดตัวโครง", // ตรวจสอบความสมบูรณ์ของชื่อข่าวนี้
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

const mockEventsData = [
    {
        id: 1,
        title: "กิจกรรมอีดิลอัฎฮา รวมใจผู้ศรัทธา แจกเนื้อกุรบาน",
        date: "15 กรกฎาคม 2568",
        startTime: "2025-07-15T10:00:00",
        endTime: "2025-07-15T12:00:00",
        details: "กิจกรรมแจกจ่ายเนื้อกุรบาน เนื่องในวันอีดิลอัฎฮา",
        location: "มัสยิดกลาง",
    },
    {
        id: 2,
        title: "ดะวะห์ออนทัวร์: เยี่ยมเยียนพี่น้องมุสลิมในชุมชนรอบมหาวิทยาลัย",
        date: "03 สิงหาคม 2568",
        startTime: "2025-08-03T09:00:00",
        endTime: "2025-08-03T16:00:00",
        details: "กิจกรรมเผยแผ่ศาสนาและเยี่ยมเยียนพี่น้องมุสลิมในชุมชนใกล้เคียงมหาวิทยาลัย",
        location: "ชุมชนรอบมหาวิทยาลัย",
    },
];


export function NewsAndEvents() {
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // เพิ่ม loading state

    // Simulate data fetching
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 วินาที
            setNews(mockNewsData as any); // ในโปรเจกต์จริงจะ fetch data จาก API
            setEvents(mockEventsData as any); // ในโปรเจกต์จริงจะ fetch data จาก API
            setLoading(false);
        };

        fetchData();
    }, []);

    const createGoogleCalendarLink = (event: typeof mockEventsData[0]) => {
        const startDate = new Date(event.startTime);
        const endDate = new Date(event.endTime);

        const formatForGoogle = (date: Date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${year}${month}${day}T${hours}${minutes}${seconds}`;
        };

        const dates = `${formatForGoogle(startDate)}/${formatForGoogle(endDate)}`;
        const title = encodeURIComponent(event.title);
        const details = encodeURIComponent(event.details);
        const location = encodeURIComponent(event.location);

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
    };

    const formatTimeForDisplay = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <section className="max-w-7xl mx-auto py-6">
            <div className="grid md:grid-cols-3 gap-10">
                {/* Left: News */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                        ข่าวประชาสัมพันธ์
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {loading ? (
                            // แสดง News Skeletons เมื่อกำลังโหลด
                            Array.from({ length: 3 }).map((_, index) => (
                                <NewsCardSkeleton key={index} />
                            ))
                        ) : (
                            // แสดงข่าวจริงเมื่อโหลดเสร็จ
                            news.map((item) => (
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
                            ))
                        )}
                    </div>
                    <div className="flex justify-end mt-4"> {/* เพิ่ม mt-4 เพื่อเว้นระยะห่าง */}
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
                            {loading ? (
                                // แสดง Event Skeletons เมื่อกำลังโหลด
                                Array.from({ length: 2 }).map((_, index) => (
                                    <EventItemSkeleton key={index} />
                                ))
                            ) : (
                                // แสดงกิจกรรมจริงเมื่อโหลดเสร็จ
                                events.map((event) => (
                                    <li
                                        key={event.id}
                                        className="bg-white border-l-4 border-blue-400 p-4 shadow-sm hover:shadow-md rounded transition"
                                    >
                                        <div>
                                            <p className="text-xs text-blue-500">
                                                {event.date}{" "}
                                                <span className="font-semibold">
                                                    ({formatTimeForDisplay(event.startTime)} -{" "}
                                                    {formatTimeForDisplay(event.endTime)})
                                                </span>
                                            </p>
                                            <h4 className="text-sm font-medium text-blue-700">
                                                {event.title}
                                            </h4>
                                        </div>
                                        <div className="mt-3">
                                            <a
                                                href={createGoogleCalendarLink(event)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                เพิ่มลงในปฏิทิน
                                            </a>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}