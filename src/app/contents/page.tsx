"use client";

import { ChevronLeft, ChevronRight, Search, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useContents } from "@/hooks/contents/useContents";
import {
  ArticleCard,
  ArticleCardSkeleton,
} from "@/components/contents/ArticleCard";
import { MobileContentsMenu } from "@/components/contents/MobileContentsMenu";
import { ContentsSidebar } from "@/components/contents/ContentsSidebar";

export default function ContentsPage() {
  const {
    groups,
    activeTab,
    blogs,
    loading,
    page,
    totalPages,
    totalItems,
    searchQuery,
    debouncedSearch,
    trending,
    pageNums,
    setSearchQuery,
    changeTab,
    goToPage,
    clearSearch,
  } = useContents();

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      {/* ── Hero ── */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden shadow-inner">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-400 rounded-full mix-blend-screen filter blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center py-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
              บทความและเนื้อหาวิชาการ
            </h1>

            {/* Search */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all focus-within:bg-white/20 focus-within:border-white/40">
                <Search className="absolute left-5 w-5 h-5 text-white/70 pointer-events-none" />
                <input
                  id="content-search"
                  type="text"
                  placeholder="ค้นหาบทความที่คุณสนใจ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 text-white text-base md:text-lg font-medium bg-transparent focus:outline-none placeholder:text-white/60"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-5 text-white/60 hover:text-white transition-colors p-1"
                    aria-label="ล้างการค้นหา"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Menu (Trending & Filters) ── */}
      {!debouncedSearch && (
        <MobileContentsMenu
          groups={groups}
          activeTab={activeTab}
          onTabChange={changeTab}
          trending={trending}
          loading={loading}
        />
      )}

      {/* ── Main Content ── */}
      <section className="py-5 bg-gray-100">
        <div className="container mx-auto px-4 max-w-[1500px]">
          <div className="flex gap-6 items-start">
            {/* Sidebar (desktop) */}
            {!debouncedSearch && (
              <ContentsSidebar
                groups={groups}
                activeTab={activeTab}
                onTabChange={changeTab}
                trending={trending}
                loading={loading}
              />
            )}

            {/* Feed */}
            <div className="flex-1 min-w-0">
              {/* Sub-header */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2
                    id="contents-grid"
                    className="text-2xl font-extrabold text-blue-800 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-12 after:h-1 after:bg-blue-500"
                  >
                    {debouncedSearch
                      ? `ผลการค้นหา "${debouncedSearch}"`
                      : activeTab !== "all"
                        ? activeTab
                        : "บทความล่าสุด"}
                  </h2>
                  {!loading && totalItems > 0 && (
                    <p className="text-sm text-gray-500 mt-3">
                      {totalItems.toLocaleString()} บทความ
                    </p>
                  )}
                </div>
                {debouncedSearch && (
                  <button
                    onClick={clearSearch}
                    className="flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    <X className="w-4 h-4" /> ล้างการค้นหา
                  </button>
                )}
              </div>

              {/* Grid */}
              {loading && blogs.length === 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ArticleCardSkeleton key={i} />
                  ))}
                </div>
              ) : blogs.length > 0 ? (
                <>
                  <div
                    className={cn(
                      "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-7 transition-opacity duration-300",
                      loading && "opacity-50 pointer-events-none"
                    )}
                  >
                    {blogs.map((b) => (
                      <ArticleCard key={b._id} blog={b} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
                      <Button
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                        className="bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-full px-4 py-2 flex items-center shadow-md transition-colors"
                        aria-label="ก่อนหน้า"
                      >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        ก่อนหน้า
                      </Button>

                      {pageNums.map((item, idx) =>
                        item === "ellipsis" ? (
                          <span
                            key={`ell-${idx}`}
                            className="px-2 text-gray-400 select-none text-lg"
                          >
                            …
                          </span>
                        ) : (
                          <Button
                            key={item}
                            onClick={() => goToPage(item as number)}
                            className={cn(
                              "border border-blue-200 min-w-[40px] h-10 rounded-full font-semibold transition-all",
                              page === item
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-white text-blue-800 hover:bg-blue-100",
                            )}
                            aria-label={`หน้าที่ ${item}`}
                          >
                            {item}
                          </Button>
                        ),
                      )}

                      <Button
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                        className="bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed rounded-full px-4 py-2 flex items-center shadow-md transition-colors"
                        aria-label="ถัดไป"
                      >
                        ถัดไป
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    ไม่พบบทความ
                  </h3>
                  <p className="text-gray-500 text-sm text-center max-w-xs leading-relaxed">
                    {debouncedSearch
                      ? `ไม่มีบทความที่ตรงกับ "${debouncedSearch}" — ลองคำค้นหาอื่นดูนะครับ`
                      : "ยังไม่มีบทความในหมวดนี้ในขณะนี้"}
                  </p>
                  {debouncedSearch && (
                    <Button
                      onClick={clearSearch}
                      className="mt-6 bg-blue-700 text-white hover:bg-blue-600 rounded-full px-8 py-2 font-semibold shadow-md"
                    >
                      ดูทั้งหมด
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
