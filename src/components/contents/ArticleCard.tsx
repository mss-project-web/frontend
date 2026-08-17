import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";
import { getCatColor, formatDate, getReadingTime } from "./contentsHelpers";

// ─── ArticleCard ─────────────────────────────────────────────
interface ArticleCardProps {
  blog: BlogPost;
}

export function ArticleCard({ blog }: ArticleCardProps) {
  const cat = getCatColor(blog.group);
  const href = `/contents/${blog.slug || blog._id}`;

  return (
    <Link
      href={href}
      className="block group"
      aria-label={`อ่านบทความ ${blog.title}`}
    >
      <Card className="h-full bg-white/95 backdrop-blur-sm border border-slate-200/60 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer flex flex-col group">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square w-full shrink-0 bg-gray-100">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="(max-width:800px) 50vw, (max-width:1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-blue-300" />
            </div>
          )}

          {/* Category badge — bottom left */}
          <div
            className={cn(
              "absolute bottom-2 left-2 md:bottom-3 md:left-3 text-white text-[10px] md:text-xs font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-md shadow-sm z-10",
              cat.bg,
              cat.text,
            )}
          >
            {blog.group || "บทความ"}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <CardContent className="p-4 md:p-5 flex-grow flex flex-col justify-start bg-white">
          <div className="mb-1.5 md:mb-3">
            <h2 className="text-[14px] sm:text-base md:text-[17px] font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-snug md:leading-tight">
              {blog.title}
            </h2>
          </div>

          <div className="text-[12px] sm:text-[13px] md:text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {blog.description}
          </div>

          {/* Meta row */}
          <div
            className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-400"
            suppressHydrationWarning
          >
            {blog.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {blog.views.toLocaleString()} วิว
              </span>
            )}
            <span className="ml-auto" suppressHydrationWarning>
              {formatDate(blog.createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── ArticleCardSkeleton ─────────────────────────────────────
export function ArticleCardSkeleton() {
  return (
    <Card className="border border-slate-200/60 shadow-sm overflow-hidden rounded-2xl h-full flex flex-col">
      <div className="relative aspect-square w-full bg-gray-100 animate-pulse shrink-0">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-white/50 backdrop-blur-sm rounded-md w-16 h-5 md:h-6" />
      </div>
      <CardContent className="p-4 md:p-5 flex-grow flex flex-col justify-start bg-white">
        <div className="mb-1.5 md:mb-3">
          <Skeleton className="h-4 md:h-5 w-[90%] mb-2 bg-gray-200" />
          <Skeleton className="h-4 md:h-5 w-[60%] bg-gray-200" />
        </div>
        <Skeleton className="h-3 md:h-4 w-full mb-1.5 bg-gray-200" />
        <Skeleton className="h-3 md:h-4 w-[80%] bg-gray-200" />
      </CardContent>
    </Card>
  );
}
