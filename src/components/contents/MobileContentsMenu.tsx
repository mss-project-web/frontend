"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ChevronDown, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";
import { useState } from "react";

interface MobileContentsMenuProps {
  groups: string[];
  activeTab: string;
  onTabChange: (v: string) => void;
  trending: BlogPost[];
  loading: boolean;
}

export function MobileContentsMenu({
  groups,
  activeTab,
  onTabChange,
  trending,
  loading,
}: MobileContentsMenuProps) {
  const all = ["all", ...groups];
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);

  return (
    <div className="lg:hidden px-4 py-6 space-y-6">
      {/* ── 1. บทความแนะนำ (Recommended / Trending) ── */}
      {!loading && trending.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            บทความแนะนำ
          </h2>
          <div className="space-y-4">
            {trending.slice(0, 3).map((post) => (
              <Link
                key={post._id}
                href={`/contents/${post.slug || post._id}`}
                className="flex items-start gap-3 group"
              >
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200 shadow-sm border border-black/5">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110 duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-300">
                      <BookOpen className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-sm md:text-[15px] font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-gray-500 mt-1 truncate font-medium">
                    {post.group}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── 2. กรองเนื้อหา (Filter Content) ── */}
      <div className="bg-gray-50 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          กรองเนื้อหา
        </h2>

        {/* Category Accordion */}
        <div className="mb-5">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center justify-between w-full text-left font-bold text-gray-800 text-[15px] mb-3"
          >
            <span>ประเภท</span>
            {isCategoryOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {isCategoryOpen && (
            <div className="flex flex-wrap gap-2 pt-1">
              {all.map((cat) => {
                const active = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onTabChange(cat)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[12px] md:text-xs font-semibold transition-all duration-200 border",
                      active
                        ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200 ring-offset-1"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                    )}
                  >
                    {cat === "all" ? "ทั้งหมด" : cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
