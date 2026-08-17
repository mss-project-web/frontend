import Link from "next/link";
import { ChevronRight, Eye, LayoutGrid, Flame, BookOpen, Filter, TrendingUp } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";

interface ContentsSidebarProps {
  groups: string[];
  activeTab: string;
  onTabChange: (v: string) => void;
  trending: BlogPost[];
  loading: boolean;
}

export function ContentsSidebar({
  groups,
  activeTab,
  onTabChange,
  trending,
  loading,
}: ContentsSidebarProps) {
  const all = ["all", ...groups];

  return (
    <aside className="hidden lg:block w-64 shrink-0 font-sans">
      <div className="sticky top-28 flex flex-col gap-5">
        {/* ─ Categories (Simple Pill Style) ─ */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <h3 className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">หมวดหมู่เนื้อหา</h3>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {all.map((cat) => {
                const active = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onTabChange(cat)}
                    className={cn(
                      "px-4 py-2 rounded-full text-[13px] font-medium transition-all border",
                      active
                        ? "bg-slate-800 text-white border-slate-800 shadow-sm"
                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                    )}
                  >
                    <span className="capitalize">{cat === "all" ? "ทั้งหมด" : cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─ Trending (Simple List) ─ */}
        {!loading && trending.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <h3 className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">ยอดนิยม</h3>
            </div>
            <div className="p-4 space-y-4">
              {trending.map((post, idx) => (
                <Link
                  href={`/contents/${post.slug || post._id}`}
                  key={post._id}
                  className="flex gap-3 group items-start"
                >
                  <span
                    className={cn(
                      "text-xl font-black shrink-0 leading-none mt-0.5 w-5 text-center",
                      idx === 0
                        ? "text-blue-500"
                        : idx === 1
                        ? "text-slate-400"
                        : "text-slate-300"
                    )}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-slate-700 line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">
                      {post.title}
                    </p>
                    {post.views !== undefined && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <Eye className="w-3 h-3" /> {post.views.toLocaleString()} วิว
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
