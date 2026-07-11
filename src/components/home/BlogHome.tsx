"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getBlogPreviews, BlogPost } from "@/services/blog";

function BlogCardSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
            <div className="relative aspect-[4/3]">
                <Skeleton className="w-full h-full bg-gray-200" />
            </div>
            <div className="p-5">
                <Skeleton className="h-3 w-16 mb-3 bg-gray-200 rounded-full" />
                <Skeleton className="h-5 w-full mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-3/4 bg-gray-200" />
                <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-3 w-24 bg-gray-200" />
                    <Skeleton className="h-3 w-12 bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export function BlogHome() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogPreviews(undefined, 1, 4);
                if (response) {
                    setBlogs(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs for home page", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("th-TH", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <section className="max-w-7xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1">
                    เนื้อหาวิชาการ
                </h2>
                <Link
                    href="/contents"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                    ดูทั้งหมด
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <BlogCardSkeleton key={index} />
                    ))
                ) : blogs.length === 0 ? (
                    <div className="col-span-4 text-center text-gray-500 py-12">
                        <p>ไม่พบเนื้อหาในขณะนี้</p>
                    </div>
                ) : (
                    blogs.map((blog, index) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -6 }}
                        >
                            <Link href={`/contents/${blog.slug || blog._id}`} className="group block h-full">
                                <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                                    {/* Cover Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        {blog.coverImage ? (
                                            <Image
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                                <span className="text-blue-400 text-4xl font-bold">📄</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        {blog.group && (
                                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none text-xs w-fit mb-2">
                                                {blog.group}
                                            </Badge>
                                        )}

                                        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-700 transition-colors text-sm leading-snug">
                                            {blog.title}
                                        </h3>

                                        <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">
                                            {blog.description}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                                            <span suppressHydrationWarning>{formatDate(blog.createdAt)}</span>
                                            {typeof blog.views === "number" && (
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    {blog.views.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
}
