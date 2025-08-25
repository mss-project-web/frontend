"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNewsAll } from "@/lib/hooks/news/useNewsAll";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from "@/components/ui/button";

const MONTHS = [
  { value: "01", label: "มกราคม" },
  { value: "02", label: "กุมภาพันธ์" },
  { value: "03", label: "มีนาคม" },
  { value: "04", label: "เมษายน" },
  { value: "05", label: "พฤษภาคม" },
  { value: "06", label: "มิถุนายน" },
  { value: "07", label: "กรกฎาคม" },
  { value: "08", label: "สิงหาคม" },
  { value: "09", label: "กันยายน" },
  { value: "10", label: "ตุลาคม" },
  { value: "11", label: "พฤศจิกายน" },
  { value: "12", label: "ธันวาคม" },
];

export default function NewsMainPage() {
  const {
    loading,
    paginatedNews,
    totalPages,
    currentPage,
    goToPage,
    selectedMonth,
    handleMonthChange,
    selectedYear,
    handleYearChange,
    availableYears,
  } = useNewsAll();

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg pt-8">
              ข่าวสารและกิจกรรมล่าสุด
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              ติดตามข่าวสาร, ประชาสัมพันธ์, และกิจกรรมที่น่าสนใจจากเราได้ที่นี่
              ไม่พลาดทุกความเคลื่อนไหวที่สำคัญ
            </p>
          </div>
        </div>
      </section>

      {/* News Section with adjusted padding */}
      <section className="py-16 bg-white relative z-10 mx-auto max-w-screen-xl px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-16 after:h-1 after:bg-blue-500 mb-4 md:mb-0">
              ข่าวสารกิจกรรม
            </h2>
            <div className="flex space-x-4">
              <Select onValueChange={handleMonthChange} value={selectedMonth || "all"}>
                <SelectTrigger className="w-[180px] bg-white text-black border border-gray-300 shadow-sm dark:bg-white dark:text-black">
                  <SelectValue placeholder="เลือกเดือน" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black dark:bg-white dark:text-black">
                  <SelectItem value="all" className="text-black dark:text-black">ทั้งหมด</SelectItem>
                  {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={month.value} className="text-black dark:text-black">
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={handleYearChange} value={selectedYear}>
                <SelectTrigger className="w-[120px] bg-white text-black border border-gray-300 shadow-sm dark:bg-white dark:text-black">
                  <SelectValue placeholder="เลือกปี" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black dark:bg-white dark:text-black">
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-black dark:text-black">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card
                  key={i}
                  className="h-full overflow-hidden shadow-lg rounded-2xl border-none"
                >
                  <Skeleton className="relative w-full h-52 rounded-b-none bg-gray-200" />
                  <CardContent className="p-6 bg-white space-y-4">
                    <Skeleton className="h-6 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-3/4 bg-gray-200" />
                    <Skeleton className="h-4 w-1/2 bg-gray-200" />
                    <Skeleton className="h-4 w-[100px] bg-gray-200" />
                  </CardContent>
                </Card>
              ))
            ) : paginatedNews.length > 0 ? (
              paginatedNews.map((item) => (
                <Link
                  key={item._id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border-none group transform hover:-translate-y-2">
                    <div className="relative w-full h-52 overflow-hidden">
                      <Image
                        src={item.images?.[0] || "/fallback.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <p className="absolute bottom-4 left-4 text-xs text-white font-medium bg-blue-600 px-3 py-1 rounded-full shadow-md">
                        {new Date(item.date).toLocaleDateString("th-TH", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <CardContent className="p-6 bg-white">
                      <h4 className="font-bold text-xl text-blue-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="text-blue-500 font-semibold flex items-center group-hover:underline transition-colors">
                        อ่านต่อ
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full py-10">
                ไม่พบข่าวสารในเดือนและปีที่เลือก
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-full px-4 py-2 flex items-center shadow-lg transition-colors duration-200"
                aria-label="ไปหน้าก่อนหน้า"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                ก่อนหน้า
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    totalPages <= 7 ||
                    Math.abs(currentPage - page) <= 1 ||
                    page === 1 ||
                    page === totalPages
                )
                .reduce((acc: (number | "ellipsis")[], page, idx, arr) => {
                  if (idx > 0 && page - arr[idx - 1]! > 1) {
                    acc.push("ellipsis");
                  }
                  acc.push(page);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "ellipsis" ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 text-gray-400 select-none text-lg"
                    >
                      ...
                    </span>
                  ) : (
                    <Button
                      key={item}
                      onClick={() => goToPage(item as number)}
                      className={`${currentPage === item
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-blue-800 hover:bg-blue-100"
                        } border border-blue-200 min-w-[40px] h-10 rounded-full font-semibold transition-all duration-200`}
                      aria-label={`ไปหน้าที่ ${item}`}
                    >
                      {item}
                    </Button>
                  )
                )}

              <Button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-full px-4 py-2 flex items-center shadow-lg transition-colors duration-200"
                aria-label="ไปหน้าถัดไป"
              >
                ถัดไป
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}