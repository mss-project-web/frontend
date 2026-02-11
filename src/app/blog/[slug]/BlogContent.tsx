"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, X, Link as LinkIcon, Copy } from "lucide-react";
import { BlogPost } from "@/services/blog";

interface BlogContentProps {
    blog: BlogPost;
}

export default function BlogContent({ blog }: BlogContentProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Function to format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderContent = (content: any[]) => {
        if (!content || !Array.isArray(content)) return null;

        return content.map((block, index) => {
            switch (block.type) {
                case "paragraph":
                    return <p key={index} className="text-gray-700 leading-relaxed mb-6 font-light text-lg">{block.data}</p>;
                case "image":
                    return (
                        <div key={index} className="my-8">
                            <div
                                className="w-full rounded-xl overflow-hidden shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                                onClick={() => setSelectedImage(block.data.url)}
                            >
                                <img
                                    src={block.data.url}
                                    alt={block.data.caption || "Blog Image"}
                                    className="w-full h-auto"
                                />
                            </div>
                            {block.data.caption && (
                                <p className="text-center text-gray-500 text-sm mt-2 italic">{block.data.caption}</p>
                            )}
                        </div>
                    );
                case "header":
                    // Fallback for different header levels if data provides it
                    return <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{block.data.text || block.data}</h2>;
                default:
                    return null;
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero/Header Image */}
            <div className="relative h-64 md:h-96 w-full bg-gray-900 overflow-hidden">
                {/* Background Image or Gradient */}
                {blog.coverImage ? (
                    <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900" />
                )}

                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/60" />
                <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
                    <div className="max-w-4xl mx-auto w-full text-white">
                        <Link href="/contents" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            กลับไปหน้าเนื้อหา
                        </Link>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{blog.title}</h1>

                        <div className="flex flex-row items-center justify-between gap-4 mb-4">
                            <div className="flex items-center space-x-6 text-blue-100 text-sm md:text-base">
                                <Badge className="bg-blue-500 hover:bg-blue-600 border-none">
                                    {blog.group || "ทั่วไป"}
                                </Badge>

                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(blog.createdAt)}
                                </span>
                            </div>

                            {/* Share Button (Only Copy Link) */}
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-200 border-none flex items-center gap-2 px-4 transition-all"
                                    onClick={handleCopyLink}
                                    title="Copy Link"
                                >
                                    {copied ? <Copy className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                                    <span className="text-sm font-medium hidden md:inline">{copied ? "Copied!" : "Copy Link"}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-12">
                    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:text-blue-900 prose-a:text-blue-600">
                        {/* Description / Lead */}
                        <p className="text-xl text-gray-600 font-medium mb-8 leading-relaxed border-l-4 border-blue-500 pl-4 py-1 italic bg-blue-50/50 rounded-r-lg">
                            {blog.description}
                        </p>

                        {/* Dynamic Content */}
                        {renderContent(blog.content || [])}

                        {/* Fallback if no content blocks but just description */}
                        {(!blog.content || blog.content.length === 0) && (
                            <div className="py-12 text-center text-gray-400 italic">
                                <p>...อ่านต่อจากรายละเอียดด้านบน...</p>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <X className="w-10 h-10" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full size view"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                    />
                </div>
            )}
        </div>
    );
}
