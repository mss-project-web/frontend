"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

//components
import RoadmapModal from "@/components/activitys/RoadmapModal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { roadmapEvents } from "@/data/roadmapEvents"

export default function ActivitysPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMonth, setSelectedMonth] = useState("ทั้งหมด")
  const eventsPerPage = 6

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const allEvents = Array.isArray(roadmapEvents)
    ? roadmapEvents.map((event) => ({
        ...event,
        month: event.monthName,
      }))
    : []

  const filteredEvents = selectedMonth === "ทั้งหมด"
    ? allEvents
    : allEvents.filter((event) => event.month === selectedMonth)

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return a.status === "open" && b.status !== "open" ? -1 : 1
  })

  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + eventsPerPage)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const uniqueMonths = Array.from(new Set(roadmapEvents.map((event) => event.monthName)))

  const groupedRoadmapEvents = roadmapEvents.reduce((acc, event) => {
      const month = event.monthName
      let monthGroup = acc.find((m) => m.month === month)
      if (!monthGroup) {
        monthGroup = { month: month, events: [] }
        acc.push(monthGroup)
      }
      monthGroup.events.push(event)
      return acc
    }, [] as { month: string; events: typeof roadmapEvents }[])

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
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
              aria-label="ดู Roadmap กิจกรรมประจำปี"
            >
              <span>ดู Roadmap ทั้งหมดของปีการศึกษา 2568</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">กิจกรรมทั้งหมด</h2>
              <Select
                value={selectedMonth}
                onValueChange={(value) => {
                  setSelectedMonth(value)
                  setCurrentPage(1)
                }}
                aria-label="กรองตามเดือน"
              >
                <SelectTrigger className="w-full sm:w-64 bg-blue-100 text-blue-900 border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-4 md:mt-0">
                  <SelectValue placeholder="เลือกเดือน" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-200 z-50">
                  <SelectItem value="ทั้งหมด">ทั้งหมด</SelectItem>
                  {uniqueMonths.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {paginatedEvents.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">ไม่พบกิจกรรมในเดือนนี้</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paginatedEvents.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/activitys/${event.slug}`}
                    className="block"
                    aria-label={`ดูรายละเอียดกิจกรรม ${event.name}`}
                  >
                    <Card className="h-full flex flex-col bg-white/95 backdrop-blur-sm border border-blue-100/50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg animate-in fade-in-20 delay-100 cursor-pointer">
                      <img
                        src={event.imageUrl || "/fallback.jpg"}
                        alt={event.name || "กิจกรรม"}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-xl font-semibold text-gray-800">{event.name}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                            <span>{event.date}</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors duration-200">
                            {event.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-4 line-clamp-1 truncate">{event.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center items-center gap-2">
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
                .filter((page) => totalPages <= 4 || Math.abs(currentPage - page) <= 1 || page === 1 || page === totalPages)
                .map((page) => (
                  <Button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`${currentPage === page ? "bg-blue-600 text-white" : "bg-white text-blue-800 hover:bg-blue-100"} border border-blue-200 min-w-[40px] rounded-md px-4 py-2`}
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
          </div>
        </div>
      </section>

      <RoadmapModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        roadmapEvents={groupedRoadmapEvents}
      />
    </div>
  )
}