"use client";

import { useEffect } from "react";
import { Calendar, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RoadmapModalProps, RoadmapMonth } from "@/types/activities";
import { useAllActivitiesRoadmap } from "@/lib/hooks/activities/useActivitiesRoadmap";

export default function RoadmapModal({ isModalOpen, handleCloseModal }: RoadmapModalProps) {
  const { activityRoadmap, loading, error } = useAllActivitiesRoadmap();

  const generatedRoadmapEvents: RoadmapMonth[] = [];

  if (activityRoadmap.length > 0) {
    activityRoadmap.forEach((item) => {
      const startDate = new Date(item.start_date);
      const monthName = startDate.toLocaleDateString("th-TH", { month: "long" });
      const formattedDate = startDate.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const existingMonth = generatedRoadmapEvents.find((m) => m.month === monthName);
      const eventItem = {
        name: item.name_th || item.name_eng,
        name_eng: item.name_eng,
        date: formattedDate,
      };

      if (existingMonth) {
        existingMonth.events.push(eventItem);
      } else {
        generatedRoadmapEvents.push({
          month: monthName,
          events: [eventItem],
        });
      }
    });
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={handleCloseModal}>
        <div className="bg-white w-[95vw] md:max-w-4xl max-h-[95vh] rounded-lg shadow-xl overflow-hidden p-6 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">กำลังโหลดข้อมูลกิจกรรม...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm" onClick={handleCloseModal}>
        <div className="bg-white w-[95vw] md:max-w-4xl max-h-[95vh] rounded-lg shadow-xl overflow-hidden p-6 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="text-lg text-red-600">เกิดข้อผิดพลาด: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white w-full max-w-[95vw] sm:w-[90vw] md:w-[75vw] lg:w-[65vw] xl:w-[60vw] max-h-[95vh] rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-blue-600 text-white p-4 relative">
          <div className="text-base sm:text-xl font-semibold">Roadmap กิจกรรมทั้งหมดของปีการศึกษา 2568</div>
          <button
            className="absolute top-2 right-2 p-2 text-white hover:text-blue-200 rounded-full hover:bg-white/20 transition-colors"
            onClick={handleCloseModal}
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[calc(95vh-64px)] overflow-y-auto">
          {generatedRoadmapEvents.length > 0 ? (
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-sky-500 to-sky-300 transform md:translate-x-[-0.5px] hidden md:block"></div>
              <div className="space-y-12">
                {generatedRoadmapEvents.map((month, index) => (
                  <div key={month.month} className="relative">
                    <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mb-4 md:mb-0">
                      <div className="w-24 h-10 bg-white shadow-lg rounded-full flex items-center justify-center font-bold text-gray-800 border-2 border-gray-200 z-10 relative">
                        {month.month}
                      </div>
                    </div>
                    <div
                      className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? "md:grid-cols-[1fr_20px_1fr]" : "md:grid-cols-[1fr_20px_1fr]"}`}
                    >
                      <div className={`${index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"}`}>
                        <div className="space-y-4">
                          {month.events.map((event, eventIndex) => (
                            <Card
                              key={eventIndex}
                              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                  <div className="w-3 h-3 rounded-full mt-1.5 bg-sky-200"></div>
                                  <div>
                                    <h4 className="font-bold text-gray-800">{event.name}</h4>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      <span>{event.date}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                      <div className="hidden md:block"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">ไม่พบข้อมูล Roadmap</p>
          )}
        </div>
      </div>
    </div>
  );
}