"use client";

import { Share2, Check, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ShareRoomButtonProps {
  roomId: string;
  roomName: string;
  roomPlace: string;
  roomFaculty: string;
}

export function ShareRoomButton({ roomId, roomName, roomPlace, roomFaculty }: ShareRoomButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/prayer-rooms/${roomId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/prayer-rooms/${roomId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ห้องละหมาด${roomName} - มหาวิทยาลัยสงขลานครินทร์`,
          text: `ดูข้อมูลห้องละหมาด${roomName} คณะ${roomFaculty} สถานที่ ${roomPlace}`,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Button
      variant="outline"
      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 border-gray-200"
      onClick={handleShare}
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
      <span>{copied ? "คัดลอกลิงก์แล้ว" : "แชร์พิกัด"}</span>
    </Button>
  );
}
