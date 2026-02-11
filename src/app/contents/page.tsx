"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { getBlogGroups, getBlogPreviews, BlogPost } from "@/services/blog";

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
                  if (data && data.length > 0) {
                        setActiveTab(data[0]); // Set first group as active by default
                  }
            };
            fetchGroups();
      }, []);

      // Fetch blogs when tab changes or page changes
      useEffect(() => {
            const fetchBlogs = async () => {
                  setLoading(true);
                  try {
                        const response = await getBlogPreviews(activeTab, page, 9); // Limit 9 for grid 3x3
                        if (response) {
                              // Client-side filtering if API returns everything
                              let filteredBlogs = response.data;
                              if (activeTab !== "all" && activeTab) {
                                    // Verify if the API returns mixed groups. If so, filter.
                                    // Check if any blog has a different group.
                                    const hasOtherGroups = filteredBlogs.some(b => b.group && b.group !== activeTab);
                                    if (hasOtherGroups) {
                                          filteredBlogs = filteredBlogs.filter(blog => blog.group === activeTab);
                                    }
                              }
                              setBlogs(filteredBlogs);
                              setTotalPages(response.totalPages);
                        }
                  } catch (error) {
                        console.error("Failed to fetch blogs", error);
                  } finally {
                        setLoading(false);
                  }
            };

            if (activeTab) {
                  fetchBlogs();
            }
      }, [activeTab, page]);

      const handleTabChange = (value: string) => {
            setActiveTab(value);
            setPage(1);
      };

      // Function to format date
      const formatDate = (dateString: string) => {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('th-TH', options);
      };

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
                        {/* Tabs Navigation */}
                        <div className="mb-8 flex justify-center">
                              {groups.length > 0 ? (
                                    <Tabs defaultValue={groups[0]} value={activeTab} onValueChange={handleTabChange} className="w-full max-w-4xl">
                                          <TabsList className="grid grid-flow-col auto-cols-auto w-full h-auto p-1 bg-white rounded-xl shadow-sm border">
                                                {groups.map((group) => (
                                                      <TabsTrigger
                                                            key={group}
                                                            value={group}
                                                            className="py-3 px-6 text-base rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                                                      >
                                                            {group}
                                                      </TabsTrigger>
                                                ))}
                                          </TabsList>
                                    </Tabs>
                              ) : (
                                    <div className="flex justify-center p-4">
                                          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                    </div>
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
                                                      <Link href={`/contents/${blog.slug}`} key={blog._id} className="group block h-full">
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
                                                                              <div className="flex items-center text-xs text-gray-500">
                                                                                    <span suppressHydrationWarning>{formatDate(blog.createdAt)}</span>
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

                                    {/* Pagination controls could go here if totalPages > 1 */}
                              </>
                        )}

                  </div>
            </div>
      );
}