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
    const createGoogleCalendarLink = (event: typeof eventsData[0]) => {
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
                            {eventsData.map((event) => (
                                <li
                                    key={event.id}
                                    className="bg-white border-l-4 border-blue-400 p-4 shadow-sm hover:shadow-md rounded transition"
                                >
                                    {/* ส่วนแสดงรายละเอียดกิจกรรม */}
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
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}