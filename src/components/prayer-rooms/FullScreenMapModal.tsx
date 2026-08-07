"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const PrayerRoomMap = dynamic(
  () => import("@/components/prayer-rooms/PrayerRoomMap").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
        <span className="text-slate-400 font-medium">กำลังโหลดแผนที่...</span>
      </Skeleton>
    ),
  }
);

interface FullScreenMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullScreenMapModal({ isOpen, onClose }: FullScreenMapModalProps) {
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-white flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex justify-between items-center shadow-sm z-[10001]">
        <div>
          <h2 className="text-lg font-bold text-slate-800">ค้นหาห้องละหมาดใกล้ฉัน</h2>
          <p className="text-sm text-slate-500">ม.อ. หาดใหญ่</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
          aria-label="ปิดแผนที่"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Map Container - The PrayerRoomMap will fill this container */}
      <div className="flex-1 relative bg-slate-50 overflow-hidden [&>div]:h-full [&>div>div]:h-full [&>div>div]:rounded-none">
         <PrayerRoomMap />
      </div>
    </div>
  );
}
