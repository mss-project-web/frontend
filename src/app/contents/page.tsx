"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Clock, Eye, Folder, ChevronRight as ChevronRightIcon, TrendingUp } from "lucide-react";
import { getBlogGroups, getBlogPreviews, BlogPost } from "@/services/blog";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------
// Helpers
// -------------------------------------------------------------
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getReadingTime = (description?: string): number => {
  if (!description) return 3;
  const words = description.split(" ").length;
  return Math.max(1, Math.ceil(words / 200));
};

const categoryColors: Record<string, string> = {
  ความรู้ทั่วไป: "bg-blue-50 text-blue-700",
  การเรียน: "bg-amber-50 text-amber-700",
  สุขภาพจิต: "bg-emerald-50 text-emerald-700",
  ไลฟ์สไตล์: "bg-purple-50 text-purple-700",
  เทคโนโลยี: "bg-indigo-50 text-indigo-700",
  ศาสนา: "bg-rose-50 text-rose-700",
  บทความ: "bg-slate-100 text-slate-700",
};

const getCategoryStyle = (group?: string) => {
  return group && categoryColors[group]
    ? categoryColors[group]
    : "bg-slate-100 text-slate-700";
};

// -------------------------------------------------------------
// Skeleton Components
// -------------------------------------------------------------
function FeedCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 animate-pulse p-4 rounded-3xl border border-slate-100 mb-6 bg-white shadow-sm">
      <div className="w-full md:w-1/3 aspect-[16/10] md:aspect-square lg:aspect-[4/3] bg-slate-100 rounded-2xl" />
      <div className="flex-1 flex flex-col justify-center space-y-4 py-2">
        <div className="w-20 h-6 bg-slate-100 rounded-full" />
        <div className="h-6 bg-slate-100 rounded w-full" />
        <div className="h-6 bg-slate-100 rounded w-4/5" />
        <div className="h-4 bg-slate-100 rounded w-full mt-4" />
        <div className="h-4 bg-slate-100 rounded w-2/3" />
        <div className="flex gap-4 mt-auto pt-4">
          <div className="w-16 h-4 bg-slate-100 rounded" />
          <div className="w-16 h-4 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Article Feed Card
// -------------------------------------------------------------
function FeedCard({ blog, index }: { blog: BlogPost; index: number }) {
  const readingTime = getReadingTime(blog.description);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col md:flex-row gap-5 p-4 rounded-3xl bg-white border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300 mb-6"
    >
      {/* Image Section */}
      <Link
        href={`/contents/${blog.slug || blog._id}`}
        className="block relative w-full md:w-[32%] aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-2xl bg-slate-50 shrink-0"
      >
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300 font-medium text-sm">
             ไม่มีรูปภาพ
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex-1 flex flex-col py-1 md:py-2 pr-2">
        <div className="mb-3">
          <span
            className={cn(
              "inline-block text-[11px] font-bold px-3 py-1 rounded-full",
              getCategoryStyle(blog.group)
            )}
          >
            {blog.group || "บทความ"}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/contents/${blog.slug || blog._id}`}>{blog.title}</Link>
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-3 mb-5 flex-1">
          {blog.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <span className="text-[12px] text-slate-400 font-medium flex items-center gap-2" suppressHydrationWarning>
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                <Image src="https://ui-avatars.com/api/?name=Admin&background=random" width={20} height={20} alt="Avatar" unoptimized />
            </div>
            {formatDate(blog.createdAt)}
          </span>
          <div className="flex items-center gap-3 text-[12px] text-slate-400 font-medium">
            {blog.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {blog.views.toLocaleString()}
              </span>
            )}
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} นาที
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// -------------------------------------------------------------
// Main Page Component
// -------------------------------------------------------------
export default function ContentsPage() {
  const [groups, setGroups] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await getBlogGroups();
      setGroups(data || []);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getBlogPreviews(
          activeTab === "all" ? undefined : activeTab,
          page,
          10,
          debouncedSearch || undefined
        );
        if (response) {
          setBlogs(response.data);
          setTotalPages(response.totalPages);
        } else {
          setBlogs([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [activeTab, page, debouncedSearch]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const allTabs = ["all", ...groups];

  // For the Trending Widget, we just sort the current page blogs by views.
  const trendingPosts = [...blogs]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* Minimal Header */}
      <header className="bg-white border-b border-slate-100 pt-16 pb-12 mb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              บทความทั้งหมด
            </h1>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              อัปเดตความรู้ สาระน่าสนใจ และข่าวสารต่างๆ จากชมรมมุสลิม ม.อ.หาดใหญ่
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* ─── LEFT COLUMN (FEED) ─── */}
          <div className="lg:w-[70%]">
            
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6 px-1">
              <h3 className="text-xl font-bold text-slate-800">
                {debouncedSearch 
                  ? `ผลการค้นหา: "${debouncedSearch}"` 
                  : activeTab !== "all" 
                    ? `หมวดหมู่: ${activeTab}` 
                    : "ฟีดบทความล่าสุด"}
              </h3>
              {!loading && blogs.length > 0 && (
                <span className="text-sm font-medium text-slate-400">
                  หน้า {page} จาก {totalPages}
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FeedCardSkeleton key={i} />
                  ))}
                </motion.div>
              ) : blogs.length > 0 ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {blogs.map((blog, i) => (
                    <FeedCard key={blog._id} blog={blog} index={i} />
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12 pb-8">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={cn(
                          "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
                          page === 1
                            ? "border-slate-100 text-slate-300 cursor-not-allowed bg-white"
                            : "border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white bg-white hover:border-slate-900"
                        )}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={cn(
                            "w-10 h-10 rounded-full text-sm font-bold transition-all",
                            p === page
                              ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                          )}
                        >
                          {p}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={cn(
                          "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
                          page === totalPages
                            ? "border-slate-100 text-slate-300 cursor-not-allowed bg-white"
                            : "border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white bg-white hover:border-slate-900"
                        )}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">ไม่พบเนื้อหา</h4>
                  <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                    {debouncedSearch 
                      ? `ไม่มีบทความที่ตรงกับคำว่า "${debouncedSearch}" ลองใช้คำค้นหาอื่น หรือดูหมวดหมู่ทั้งหมด` 
                      : "ขออภัย ยังไม่มีบทความในระบบตอนนี้"}
                  </p>
                  {debouncedSearch && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-8 text-sm bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                    >
                      ล้างการค้นหา
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── RIGHT COLUMN (STICKY SIDEBAR) ─── */}
          <aside className="lg:w-[30%]">
            <div className="sticky top-28 space-y-6">
              
              {/* Search Widget */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  ค้นหาบทความ
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="พิมพ์คำค้นหา..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-5 pr-12 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors bg-slate-50 text-sm font-medium"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-xl">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Categories Widget */}
              {groups.length > 0 && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    หมวดหมู่เนื้อหา
                  </h3>
                  <ul className="space-y-1">
                    {allTabs.map((cat) => {
                      const isActive = activeTab === cat;
                      return (
                        <li key={cat}>
                          <button
                            onClick={() => handleTabChange(cat)}
                            className={cn(
                              "w-full flex items-center justify-between p-3 rounded-xl font-medium transition-all group",
                              isActive
                                ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                                : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-100"
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <Folder className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
                              {cat === "all" ? "ทั้งหมด" : cat}
                            </span>
                            {isActive && <ChevronRightIcon className="w-4 h-4" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Trending Widget */}
              {!loading && trendingPosts.length > 0 && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> บทความยอดนิยม
                  </h3>
                  <div className="space-y-5">
                    {trendingPosts.map((post, idx) => (
                      <Link
                        href={`/contents/${post.slug || post._id}`}
                        key={post._id}
                        className="flex gap-4 group items-start"
                      >
                        <div className="text-2xl font-black text-slate-200 group-hover:text-blue-200 transition-colors shrink-0 w-6 mt-1">
                          {idx + 1}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-[14px] font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-1.5">
                            {post.title}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5" suppressHydrationWarning>
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
