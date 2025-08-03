"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Skeleton } from '@/components/ui/skeleton';
import { ActivityForCalendarLink } from "@/types/activities";

//API
import { useNews } from "@/lib/hooks/news/useNews";
import { useActivitiesThisMonth } from "@/lib/hooks/activities/useActivitiesThisMonth";

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

// --- Activity Item Skeleton ---
function ActivityItemSkeleton() {
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

export function NewsAndEvents() {
    const { news, loading: newsLoading, error: newsError } = useNews();
    const { activities, loading: activityLoading, error: activityError } = useActivitiesThisMonth();

    const createGoogleCalendarLink = (activityData: ActivityForCalendarLink) => {
        const startDate = activityData.start;
        const endDate = activityData.end;

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
        const title = encodeURIComponent(activityData.name);
        const details = encodeURIComponent(activityData.description);
        const location = encodeURIComponent(activityData.location);

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
    };

    // ฟังก์ชันจัดรูปแบบเวลาสำหรับแสดงผล
    const formatTimeForDisplay = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return ( // <--- This 'return' statement should be correctly positioned
        <section className="max-w-7xl mx-auto py-6">
            <div className="grid md:grid-cols-3 gap-10">
                {/* Left: News Section */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                        ข่าวประชาสัมพันธ์
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {newsLoading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <NewsCardSkeleton key={index} />
                            ))
                        ) : newsError ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <NewsCardSkeleton key={index} />
                            ))
                        ) : news.length === 0 ? (
                            <div className="col-span-3 text-center text-gray-500">
                                <p>ไม่พบข่าวสารในขณะนี้</p>
                            </div>
                        ) : (
                            news.map((newsItem) => (
                                <motion.div
                                    key={newsItem._id}
                                    whileHover={{ y: -4 }}
                                    className="rounded-lg border border-blue-100 bg-blue-50 shadow-sm hover:shadow-md transition"
                                >
                                    <a
                                        href={newsItem.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="relative w-full h-40 rounded-t-lg overflow-hidden bg-blue-100">
                                            <Image
                                                src={newsItem.images?.[0] || "/no-image.jpg"}
                                                alt={newsItem.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 600px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-semibold text-blue-700 mb-0 line-clamp-2">
                                                {newsItem.name}
                                            </h4>
                                            <div className="text-sm text-blue-700 line-clamp-2">
                                                {newsItem.description}
                                            </div>
                                            <p className="text-xs text-blue-800">
                                                จัดวันที่{" "}
                                                {new Date(newsItem.date).toLocaleDateString("th-TH", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </a>
                                </motion.div>
                            ))
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <Link href="/news">
                            <div className="py-3 text-sx text-left text-gray-800 border-b-2 border-gray-300 inline-block pb-1 mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-300 cursor-pointer">
                                ข่าวสารทั้งหมด
                            </div>
                        </Link>
                    </div>
                </div>


                {/* --- Right: Activities Section --- */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                            กิจกรรมประจำเดือนนี้
                        </h2>
                        <ul
                            className={`space-y-4 ${activities.length > 2 ? "max-h-72 overflow-y-auto" : ""}`}
                        >
                            {activityLoading ? (
                                Array.from({ length: 2 }).map((_, index) => (
                                    <ActivityItemSkeleton key={index} />
                                ))
                            ) : activityError ? (
                                Array.from({ length: 2 }).map((_, index) => (
                                    <ActivityItemSkeleton key={index} />
                                ))
                            ) : activities.length === 0 ? (
                                <li>
                                    <p className="text-sm text-gray-500 text-center sm:text-start">ไม่มีกิจกรรมในเดือนนี้</p>
                                </li>
                            ) : (
                                activities.map((activity) => (
                                    <li
                                        key={activity._id}
                                        className="bg-white border-l-4 border-blue-400 p-4 shadow-sm hover:shadow-md rounded transition"
                                    >
                                        <div>
                                            <p className="text-xs text-blue-500">
                                                {new Date(activity.start_date).toLocaleDateString("th-TH", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}{" "}
                                                <span className="font-semibold">
                                                    ({formatTimeForDisplay(activity.start_date)} -{" "}
                                                    {formatTimeForDisplay(activity.end_date)})
                                                </span>
                                            </p>
                                            <h4 className="text-sm font-medium text-blue-700">
                                                {activity.name_th}
                                            </h4>
                                        </div>
                                        <div className="mt-3">
                                            <a
                                                href={createGoogleCalendarLink({
                                                    name: activity.name_th,
                                                    description: activity.description,
                                                    location: activity.location,
                                                    start: new Date(activity.start_date),
                                                    end: new Date(activity.end_date),
                                                })}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    ></path>
                                                </svg>
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