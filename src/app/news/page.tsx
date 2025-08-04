"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { NewsAll } from "@/types/news";
import { API_URL } from "@/config";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function NewsMainPage() {
  const [allNews, setAllNews] = useState<NewsAll[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNews = async (month?: string) => {
    setLoading(true);
    try {
      const endpoint = month ? `/news/this-month?month=${month}` : "/news";
      const res = await axios.get(`${API_URL}${endpoint}`);
      setAllNews(res.data.data.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedMonth);
  }, [selectedMonth]);

  const totalPages = Math.ceil(allNews.length / ITEMS_PER_PAGE);

  const paginatedNews = allNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ข่าวสารกิจกรรมล่าสุด</h1>
        <div className="mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border p-2 rounded"
            aria-label="เลือกเดือน"
          >
            <option value="">ทั้งหมด</option>
            <option value="01">มกราคม</option>
            <option value="02">กุมภาพันธ์</option>
            <option value="03">มีนาคม</option>
            <option value="04">เมษายน</option>
            <option value="05">พฤษภาคม</option>
            <option value="06">มิถุนายน</option>
            <option value="07">กรกฎาคม</option>
            <option value="08">สิงหาคม</option>
            <option value="09">กันยายน</option>
            <option value="10">ตุลาคม</option>
            <option value="11">พฤศจิกายน</option>
            <option value="12">ธันวาคม</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div
              key={i}
              className="w-full h-60 bg-gray-200 animate-pulse rounded-lg"
            />
          ))
        ) : paginatedNews.length > 0 ? (
          paginatedNews.map((item) => (
            <Link
              key={item._id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="h-full overflow-hidden shadow hover:shadow-lg transition rounded-xl cursor-pointer">
                <div className="relative w-full h-48">
                  <Image
                    src={item.images?.[0] || "/fallback.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-900 mb-1 line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-sm text-blue-900 mb-2 line-clamp-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-blue-600">
                    วันที่{" "}
                    {new Date(item.date).toLocaleDateString("th-TH", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            ไม่พบข่าวสารในเดือนนี้
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md px-4 py-2 flex items-center"
            aria-label="ไปหน้าก่อนหน้า"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            ก่อนหน้า
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                totalPages <= 4 ||
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
                  className="px-2 text-gray-400 select-none"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => goToPage(item)}
                  className={`${
                    currentPage === item
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-800 hover:bg-blue-100"
                  } border border-blue-200 min-w-[40px] rounded-md px-4 py-2`}
                  aria-label={`ไปหน้าที่ ${item}`}
                >
                  {item}
                </button>
              )
            )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md px-4 py-2 flex items-center"
            aria-label="ไปหน้าถัดไป"
          >
            ถัดไป
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
