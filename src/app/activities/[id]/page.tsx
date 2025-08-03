"use client";

import { useActivityById } from "@/lib/hooks/activities/useActivityById";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Target, CheckCircle, MessageSquare, MapPin, Users, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityDetailPage() {
  const { id } = useParams();
  const { activity, loading, error } = useActivityById(id as string);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Loading State */}
      {loading ? (
        <>
          {/* Hero Section Skeleton */}
          <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <Skeleton className="h-6 w-48 mx-auto mb-6 bg-blue-300" />
                <Skeleton className="h-10 w-2/3 mx-auto mb-4 bg-blue-400" />
                <Skeleton className="h-6 w-1/2 mx-auto bg-blue-300" />
              </div>
            </div>
          </section>

          {/* Content Section Skeleton */}
          <section className="bg-white">
            <div className="container mx-auto px-6 py-12">
              <div className="max-w-6xl mx-auto">
                {/* Quick Info Bar Skeleton */}
                <div className="flex justify-center items-center py-8">
                  <div className="w-full max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Skeleton className="h-[100px] rounded-lg bg-gray-200" />
                      <Skeleton className="h-[100px] rounded-lg bg-gray-200" />
                      <Skeleton className="h-[100px] rounded-lg bg-gray-200" />
                    </div>
                  </div>
                </div>

                {/* Main Content Grid Skeleton */}
                <div className="grid lg:grid-cols-3 gap-12">
                  {/* Left Column Skeleton */}
                  <div className="lg:col-span-2 space-y-12">
                    <section>
                      <Skeleton className="h-8 w-64 mb-6 bg-gray-200" />
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-5/6 bg-gray-200" />
                      </div>
                    </section>
                    <section>
                      <Skeleton className="h-8 w-48 mb-6 bg-gray-200" />
                      <div className="grid grid-cols-2 gap-6">
                        <Skeleton className="aspect-[4/3] rounded-lg bg-gray-200" />
                        <Skeleton className="aspect-[4/3] rounded-lg bg-gray-200" />
                        <Skeleton className="aspect-[4/3] rounded-lg bg-gray-200" />
                        <Skeleton className="aspect-[4/3] rounded-lg bg-gray-200" />
                      </div>
                    </section>
                    <section>
                      <Skeleton className="h-8 w-56 mb-6 bg-gray-200" />
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-3/4 bg-gray-200" />
                      </div>
                    </section>
                    <section>
                      <Skeleton className="h-8 w-44 mb-6 bg-gray-200" />
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-5/6 bg-gray-200" />
                      </div>
                    </section>
                  </div>

                  {/* Right Column Skeleton */}
                  <div className="space-y-8">
                    <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <Skeleton className="h-6 w-32 mb-4 bg-gray-200" />
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                      </div>
                    </section>
                    <section>
                      <Skeleton className="h-6 w-48 mb-6 bg-gray-200" />
                      <div className="space-y-6">
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-5/6 bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : // Error State
      error ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-sm w-full">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">เกิดข้อผิดพลาด</h2>
            <p className="text-gray-600">ไม่สามารถโหลดข้อมูลกิจกรรมได้ กรุณาลองใหม่อีกครั้ง</p>
            <div className="mt-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                กลับสู่หน้าหลัก
              </Link>
            </div>
          </div>
        </div>
      ) : // Not Found State
      !activity ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-sm w-full">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">ไม่พบกิจกรรม</h2>
            <p className="text-gray-600">กิจกรรมที่คุณกำลังมองหาอาจถูกลบไปแล้วหรือไม่มีอยู่จริง</p>
            <div className="mt-4">
              <Link href="/activitys" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                ดูรายการกิจกรรมทั้งหมด
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // Success State
        <>
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <nav className="mb-6 flex items-center justify-center space-x-2 text-base text-white">
                  <Link href="/" className="hover:underline hover:text-blue-100 transition-colors">
                    หน้าหลัก
                  </Link>
                  <span className="text-gray-400">/</span>
                  <Link href="/activitys" className="hover:underline hover:text-blue-100 transition-colors">
                    กิจกรรม
                  </Link>
                  <span className="text-gray-400">/</span>
                  <span className="font-medium text-blue-100 flex items-center space-x-1">
                    <span>{activity.name_eng}</span>
                  </span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{activity.name_eng}</h1>
                <div className="text-lg md:text-xl opacity-90">
                  {activity.name_th}
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="bg-white">
            <div className="container mx-auto px-6 py-12">
              <div className="max-w-6xl mx-auto">
                {/* Quick Info Bar */}
                <div className="flex justify-center items-center py-8">
                  <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="backdrop-blur-lg px-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-4">
                        {/* สถานที่จัดกิจกรรม */}
                        <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left
                        bg-white/60 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-100">
                          <MapPin className="text-blue-600 mb-2" size={28} />
                          <div>
                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">สถานที่จัดกิจกรรม</h3>
                            <p className="text-gray-600 text-sm sm:text-base">{activity.location}</p>
                          </div>
                        </div>

                        {/* จำนวนผู้เข้าร่วม */}
                        <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left
                        bg-white/60 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-100">
                          <Users className="text-green-600 mb-2" size={28} />
                          <div>
                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">จำนวนผู้เข้าร่วม</h3>
                            <p className="text-gray-600 text-sm sm:text-base">{activity.participants} คน</p>
                          </div>
                        </div>

                        {/* ระยะเวลา */}
                        <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left
                        bg-white/60 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-100">
                          <Clock className="text-purple-600 mb-2" size={28} />
                          <div>
                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">ระยะเวลา</h3>
                            <p className="text-gray-600 text-sm sm:text-base">{activity.duration} ชั่วโมง</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12">
                  {/* Left Column - Main Content */}
                  <div className="lg:col-span-2 space-y-12">
                    {/* Description */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">
                        รายละเอียดกิจกรรม
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {activity.description}
                        </p>
                      </div>
                    </section>

                    {/* Images Gallery */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">
                        ภาพกิจกรรม
                      </h2>
                      <div className="grid grid-cols-2 gap-6">
                        {activity.images && activity.images.length > 0 ? (
                          activity.images.slice(0, 4).map((img, index) => (
                            <div key={index} className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                              <img
                                src={img}
                                alt={`กิจกรรม ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-gray-500">ไม่มีรูปภาพ</span>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Objectives */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3 flex items-center space-x-3">
                        <Target className="text-blue-600" size={28} />
                        <span>วัตถุประสงค์</span>
                      </h2>
                      <div className="space-y-4">
                        {activity.objectives && activity.objectives.length > 0 ? (
                          activity.objectives.map((objectives, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 font-semibold">
                                {index + 1}
                              </div>
                              <p className="text-gray-700 leading-relaxed text-lg pt-1">{objectives}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">ไม่มีข้อมูลวัตถุประสงค์</p>
                        )}
                      </div>
                    </section>

                    {/* Goals */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3 flex items-center space-x-3">
                        <CheckCircle className="text-green-600" size={28} />
                        <span>เป้าหมาย</span>
                      </h2>
                      <div className="space-y-4">
                        {activity.goals && activity.goals.length > 0 ? (
                          activity.goals.map((goal, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                              <p className="text-gray-700 leading-relaxed text-lg">{goal}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">ไม่มีข้อมูลเป้าหมาย</p>
                        )}
                      </div>
                    </section>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="space-y-8">
                    <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">ข้อมูลสรุป</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">จำนวนผู้เข้าร่วม:</span>
                          <span className="font-semibold">{activity.participants} คน</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ระยะเวลา:</span>
                          <span className="font-semibold">{activity.duration} ชั่วโมง</span>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                        <MessageSquare className="text-purple-600" size={24} />
                        <span>ความคิดเห็นผู้เข้าร่วม</span>
                      </h3>

                      <div className="space-y-6">
                        {activity.feedbacks && activity.feedbacks.length > 0 ? (
                          activity.feedbacks.map((feedback, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                              <p className="text-gray-700 leading-relaxed">{feedback}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">ยังไม่มีความคิดเห็น</p>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}