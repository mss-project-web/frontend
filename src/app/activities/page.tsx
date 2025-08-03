"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useActivities } from "@/lib/hooks/activities/useActivities";
import { ActivityCard } from "@/components/activities/ActivityCard";
import RoadmapModal from "@/components/activities/RoadmapModal";

export default function ActivitysPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldScroll, setShouldScroll] = useState(false);
  const { activities, loading, error } = useActivities();

  // State for the Roadmap Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const eventsPerPage = 6;

  const allEvents = activities.map((activity) => ({
    ...activity,
    name: activity.name_th,
    imageUrl: activity.images?.[0] ?? "/fallback.jpg",
    status: "open",
    category: "ทั่วไป",
  }));

  const sortedEvents = [...allEvents].sort((a, b) => {
    const isOpenA = (a as any).status === "open";
    const isOpenB = (b as any).status === "open";
    return isOpenA === isOpenB ? 0 : isOpenA ? -1 : 1;
  });

  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + eventsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setShouldScroll(true);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setShouldScroll(true);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setShouldScroll(true);
    }
  };

  useEffect(() => {
    if (shouldScroll) {
      const element = document.getElementById("all-activities");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setShouldScroll(false);
        }, 100);
      }
    }
  }, [currentPage, shouldScroll]);

  const showSkeleton = !!(loading || error);


  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <nav className="mb-6 flex items-center justify-center space-x-2 text-base text-white">
              <Link href="/" className="hover:underline hover:text-blue-100 transition-colors">
                หน้าหลัก
              </Link>
              <span className="text-gray-400">/</span>
              <span className="font-medium text-blue-100 flex items-center space-x-1">
                <span>กิจกรรม</span>
              </span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">กิจกรรม</h1>
            <p className="text-lg md:text-xl opacity-90">
              ร่วมสร้างประสบการณ์ใหม่ๆ ผ่านกิจกรรมที่ออกแบบมาเพื่อพัฒนาศักยภาพและสร้างความสัมพันธ์
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 bg-white text-blue-800 text-lg py-3 px-8 rounded-md shadow-sm hover:bg-gray-100 hover:text-blue-900 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group mx-auto"
            >
              Roadmap กิจกรรมทั้งปี 2568
            </Button>
            <RoadmapModal
              isModalOpen={isModalOpen}
              handleCloseModal={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2
              id="all-activities"
              className="text-3xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 pt-2 mb-8"
            >
              กิจกรรมทั้งหมด
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {showSkeleton ? (
                Array(eventsPerPage)
                  .fill(0)
                  .map((_, index) => <ActivityCard key={index} isLoading={true} />)
              ) : paginatedEvents.length === 0 ? (
                <p className="col-span-full text-center text-gray-500 mt-8">ไม่พบกิจกรรม</p>
              ) : (
                paginatedEvents.map((event) => (
                  <ActivityCard key={event._id} activity={event} isLoading={false} />
                ))
              )}
            </div>

            {!showSkeleton && totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                <Button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md px-4 py-2"
                  aria-label="ไปหน้าก่อนหน้า"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  ก่อนหน้า
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      totalPages <= 4 ||
                      Math.abs(currentPage - page) <= 1 ||
                      page === 1 ||
                      page === totalPages
                  )
                  .map((page) => (
                    <Button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`${currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-800 hover:bg-blue-100"
                        } border border-blue-200 min-w-[40px] rounded-md px-4 py-2`}
                      aria-label={`ไปหน้าที่ ${page}`}
                    >
                      {page}
                    </Button>
                  ))}

                <Button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md px-4 py-2"
                  aria-label="ไปหน้าถัดไป"
                >
                  ถัดไป
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}