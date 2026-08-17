"use client";

import { cn } from "@/lib/utils";

interface CategoryBarProps {
  groups: string[];
  activeTab: string;
  onTabChange: (v: string) => void;
}

export function CategoryBar({ groups, activeTab, onTabChange }: CategoryBarProps) {
  const all = ["all", ...groups];

  return (
    <div className="lg:hidden bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
      <div
        className="flex gap-2 overflow-x-auto px-4 py-3"
        style={{ scrollbarWidth: "none" }}
      >
        {all.map((cat) => {
          const active = activeTab === cat;
          return (
            <button
              key={cat}
              id={`cat-chip-${cat}`}
              onClick={() => onTabChange(cat)}
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 border transition-all duration-200",
                active
                  ? "bg-blue-700 text-white border-blue-700 shadow-md"
                  : "bg-white text-blue-800 border-blue-200 hover:bg-blue-50"
              )}
            >
              {cat === "all" ? "ทั้งหมด" : cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
