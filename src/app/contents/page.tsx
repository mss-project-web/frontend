"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { Loader2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { getBlogGroups, getBlogPreviews, BlogPost } from "@/services/blog";
import { cn } from "@/lib/utils";

export default function ContentsPage() {
      const [groups, setGroups] = useState<string[]>([]);
      const [activeTab, setActiveTab] = useState<string>("all");
      const [blogs, setBlogs] = useState<BlogPost[]>([]);
      const [loading, setLoading] = useState(true);
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);

      // Fetch groups on mount
      useEffect(() => {
            const fetchGroups = async () => {
                  const data = await getBlogGroups();
                  setGroups(data || []);
            };
            fetchGroups();
      }, []);

      // Fetch blogs when tab changes or page changes
      useEffect(() => {
            const fetchBlogs = async () => {
                  setLoading(true);
                  try {
                        const response = await getBlogPreviews(activeTab === "all" ? undefined : activeTab, page, 9); // Limit 9 for grid 3x3
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
      }, [activeTab, page]);

      const handleTabChange = (value: string) => {
            setActiveTab(value);
            setPage(1);
      };

      const handlePageChange = (newPage: number) => {
            if (newPage >= 1 && newPage <= totalPages) {
                  setPage(newPage);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
            }
      };

      // Function to format date
      const formatDate = (dateString: string) => {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('th-TH', options);
      };

      // Group logic
      const mainGroups = groups.slice(0, 3);
      const moreGroups = groups.slice(3);
      const inMoreGroups = moreGroups.includes(activeTab);

      return (
            <div className="min-h-screen bg-gray-50 pb-20">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 mb-10">
                        <div className="container mx-auto text-center">
                              <h1 className="text-4xl md:text-5xl font-bold mb-4">เนื้อหาวิชาการ</h1>
                              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                                    รวบรวมบทความ ข่าวสาร และสาระน่ารู้จากชมรมมุสลิม ม.อ.หาดใหญ่
                              </p>
                        </div>
                  </div>

                  <div className="container mx-auto px-4">
                        {/* Group Filter Navigation */}
                        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
                              {/* All Button */}
                              <Button
                                    variant={activeTab === "all" ? "default" : "outline"}
                                    onClick={() => handleTabChange("all")}
                                    className={cn(
                                          "rounded-full px-6",
                                          activeTab === "all" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:text-blue-600 hover:border-blue-600 bg-white text-gray-600 border-gray-200"
                                    )}
                              >
                                    ทั้งหมด
                              </Button>

                              {/* Main Groups (Max 3) */}
                              {mainGroups.map((group) => (
                                    <Button
                                          key={group}
                                          variant={activeTab === group ? "default" : "outline"}
                                          onClick={() => handleTabChange(group)}
                                          className={cn(
                                                "rounded-full px-6",
                                                activeTab === group ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:text-blue-600 hover:border-blue-600 bg-white text-gray-600 border-gray-200"
                                          )}
                                    >
                                          {group}
                                    </Button>
                              ))}

                              {/* More Groups Dropdown */}
                              {moreGroups.length > 0 && (
                                    <Select
                                          value={inMoreGroups ? activeTab : ""}
                                          onValueChange={handleTabChange}
                                    >
                                          <SelectTrigger
                                                className={cn(
                                                      "w-[180px] rounded-full border-gray-200 bg-white text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors",
                                                      inMoreGroups && "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white hover:border-blue-700"
                                                )}
                                          >
                                                <SelectValue placeholder="หมวดหมู่อื่นๆ" />
                                          </SelectTrigger>
                                          <SelectContent>
                                                {moreGroups.map((group) => (
                                                      <SelectItem key={group} value={group}>
                                                            {group}
                                                      </SelectItem>
                                                ))}
                                          </SelectContent>
                                    </Select>
                              )}
                        </div>

                        {/* Blog Grid */}
                        {loading ? (
                              <div className="flex justify-center py-20">
                                    <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                              </div>
                        ) : (
                              <>
                                    {blogs.length > 0 ? (
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {blogs.map((blog) => (
                                                      <Link href={`/contents/${blog.slug || blog._id}`} key={blog._id} className="group block h-full">
                                                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200">
                                                                  {/* Background Image */}
                                                                  {blog.coverImage ? (
                                                                        <Image
                                                                              src={blog.coverImage}
                                                                              alt={blog.title}
                                                                              fill
                                                                              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                                        />
                                                                  ) : (
                                                                        <div className="h-full w-full bg-gray-300" />
                                                                  )}

                                                                  {/* Gradient Overlay - White from bottom */}
                                                                  <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-white via-white/90 to-transparent" />

                                                                  {/* Content Overlay */}
                                                                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                                                                        <div className="mb-2">
                                                                              <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-none mb-2">
                                                                                    {blog.group || "ทั่วไป"}
                                                                              </Badge>
                                                                        </div>

                                                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-700 transition-colors">
                                                                              {blog.title}
                                                                        </h3>

                                                                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                                              {blog.description}
                                                                        </p>

                                                                        <div className="flex items-center justify-between">
                                                                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                                                                    <span suppressHydrationWarning>{formatDate(blog.createdAt)}</span>
                                                                                    {typeof blog.views === 'number' && (
                                                                                          <span className="flex items-center gap-1">
                                                                                                <Eye className="w-3 h-3" />
                                                                                                {blog.views.toLocaleString()}
                                                                                          </span>
                                                                                    )}
                                                                              </div>

                                                                              <div className="flex flex-wrap gap-1 justify-end">
                                                                                    {blog.tags?.slice(0, 3).map(tag => (
                                                                                          <span key={tag} className="text-[10px] bg-gray-100/80 text-gray-600 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                                                                #{tag}
                                                                                          </span>
                                                                                    ))}
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </Link>
                                                ))}
                                          </div>
                                    ) : (
                                          <div className="text-center py-20 text-gray-500">
                                                <p>ไม่พบเนื้อหาในหมวดหมู่นี้</p>
                                          </div>
                                    )}

                                    {/* Pagination Controls */}
                                    {totalPages > 1 && (
                                          <div className="flex justify-center items-center gap-4 mt-12">
                                                <Button
                                                      variant="outline"
                                                      size="sm"
                                                      onClick={() => handlePageChange(page - 1)}
                                                      disabled={page === 1}
                                                      className="rounded-full"
                                                >
                                                      <ChevronLeft className="w-4 h-4 mr-2" />
                                                      ก่อนหน้า
                                                </Button>
                                                <span className="text-sm text-gray-600 font-medium">
                                                      หน้า {page} จาก {totalPages}
                                                </span>
                                                <Button
                                                      variant="outline"
                                                      size="sm"
                                                      onClick={() => handlePageChange(page + 1)}
                                                      disabled={page === totalPages}
                                                      className="rounded-full"
                                                >
                                                      ถัดไป
                                                      <ChevronRight className="w-4 h-4 ml-2" />
                                                </Button>
                                          </div>
                                    )}
                              </>
                        )}
                  </div>
            </div>
      );
}