import { Calendar, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RoadmapModalProps } from "@/types/activitys"

export default function RoadmapModal({ isModalOpen, handleCloseModal, roadmapEvents }: RoadmapModalProps) {
  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
          role="dialog"
          aria-label="Roadmap กิจกรรมประจำปี"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white max-w-[95vw] md:max-w-4xl rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-blue-600 text-white p-4 relative">
              <div className="text-xl font-semibold">Roadmap กิจกรรมประจำปี 2568-2569</div>
              <button
                className="absolute top-2 right-2 text-white hover:text-blue-200"
                onClick={handleCloseModal}
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 transform md:translate-x-[-0.5px] hidden md:block"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                  {roadmapEvents.map((month, index) => (
                    <div key={month.month} className="relative">
                      {/* Month Label */}
                      <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mb-4 md:mb-0">
                        <div className="w-24 h-10 bg-white shadow-lg rounded-full flex items-center justify-center font-bold text-gray-800 border-2 border-gray-200">
                          {month.month}
                        </div>
                      </div>

                      {/* Events */}
                      <div
                        className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? "" : "md:flex md:flex-row-reverse"}`}
                      >
                        <div className={`hidden md:block ${index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}`}></div>
                        <div className={`space-y-4 ${index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"}`}>
                          {month.events.map((event, eventIndex) => (
                            <Card
                              key={eventIndex}
                              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                  <div className={`w-3 h-3 rounded-full mt-1.5 ${event.color}`}></div>
                                  <div>
                                    <h4 className="font-bold text-gray-800">{event.name}</h4>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      <span>{event.date}</span>
                                    </div>
                                    <Badge className="mt-2" variant="outline">
                                      {event.category}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}