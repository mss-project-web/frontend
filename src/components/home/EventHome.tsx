"use client";

import React from "react";
import { Event } from "@/types/activitys";
import Link from "next/link";

const events: Event[] = [
      {
            id: 1,
            name: "กิจกรรมวิ่งเพื่อสุขภาพ",
            category: "สุขภาพ",
            description: "ร่วมวิ่งและออกกำลังกายเพื่อสุขภาพที่ดีขึ้นกับเพื่อนๆ",
            date: "10 สิงหาคม 2568",
            time: "07:00 - 10:00 น.",
            location: "สวนสาธารณะเมือง",
            imageUrl: "/images/run-event.jpg",
      },
      {
            id: 2,
            name: "สัมมนาเทคโนโลยีใหม่",
            category: "เทคโนโลยี",
            description: "อัพเดทเทรนด์และนวัตกรรมใหม่ในวงการ IT",
            date: "15 สิงหาคม 2568",
            time: "09:00 - 16:00 น.",
            location: "ศูนย์ประชุมแห่งชาติ",
            imageUrl: "/images/tech-seminar.jpg",
      },
      {
            id: 3,
            name: "ประกวดวาดภาพศิลปะ",
            category: "ศิลปะ",
            description: "แสดงความคิดสร้างสรรค์ผ่านงานศิลปะของคุณ",
            date: "20 สิงหาคม 2568",
            time: "10:00 - 17:00 น.",
            location: "หอศิลป์เมือง",
            imageUrl: "/images/art-contest.jpg",
      },
];

export function EventHome() {
      return (
            <section className="max-w-7xl mx-auto py-6">
                  <h2 className="text-2xl font-extrabold text-blue-800 mb-8 border-b-2 border-gray-300 inline-block pb-1">
                        กิจกรรมดีเด่น
                  </h2>

                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                              <div
                                    key={event.id}
                                    className="h-full flex flex-col bg-white/95 backdrop-blur-sm border border-blue-100/50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg cursor-pointer"
                              >
                                    <img
                                          src={event.imageUrl}
                                          alt={event.name}
                                          className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                    <div className="p-4 flex-grow flex flex-col"> {/* CardContent equivalent */}
                                          <div className="flex items-center space-x-4 mb-3">
                                                <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                                          </div>
                                          <div className="space-y-2">
                                                <div className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors duration-200 self-start"> {/* Badge equivalent */}                                                      {event.category}
                                                </div>
                                          </div>
                                          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{event.description}</p> {/* เพิ่ม line-clamp-2 เพื่อให้มี 2 บรรทัด */}
                                    </div>
                              </div>
                        ))}
                  </div>
                  <div className="flex justify-end">
                        <Link href="/activitys">
                              <div className="py-3 text-sx text-left text-gray-800 border-b-2 border-gray-300 inline-block pb-1 mb-4 hover:text-blue-600 hover:border-blue-600 transition-colors duration-300 cursor-pointer">
                                    กิจกรรมทั้งหมด
                              </div>
                        </Link>
                  </div>
            </section>
      );
}
