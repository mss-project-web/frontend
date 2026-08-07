"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  roomName: string;
}

export function ImageGallery({ images, roomName }: ImageGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-12 border border-gray-100">
        ไม่มีรูปภาพประกอบ
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextImage();
    } else if (distance < -minSwipeDistance) {
      prevImage();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <>
      {/* Gallery Layout */}
      <div className="mb-12 space-y-3">
        {/* Main Hero Image */}
        <div 
          className="relative aspect-[4/3] md:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <Image 
            src={images[0]} 
            alt={roomName} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
            unoptimized 
            priority 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
             <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-900 text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-opacity">
               คลิกเพื่อดูรูปขยาย
             </span>
          </div>
        </div>

        {/* Thumbnail Row */}
        {images.length > 1 && (
          <div className="flex overflow-x-auto gap-3 pb-2 snap-x scrollbar-hide">
            {images.slice(1).map((img, idx) => (
              <div 
                key={idx} 
                className="relative h-24 w-32 md:h-32 md:w-44 rounded-xl overflow-hidden shrink-0 snap-start bg-gray-100 border border-gray-100 cursor-pointer group"
                onClick={() => openLightbox(idx + 1)}
              >
                <Image 
                  src={img} 
                  alt={`${roomName} ${idx + 2}`} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  unoptimized 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="absolute top-0 w-full p-4 flex justify-between items-center z-50">
            <div className="text-white/70 text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
            <button 
              onClick={closeLightbox}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="ปิดรูปภาพ"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Container */}
          <div 
            className="relative w-full max-w-5xl h-full max-h-[80vh] flex items-center justify-center p-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]}
                alt={`${roomName} - รูปที่ ${currentIndex + 1}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Navigation Arrows (Desktop) */}
            {images.length > 1 && (
              <>
                <button
                  className="hidden md:flex absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  className="hidden md:flex absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          
          {/* Mobile swipe hint */}
          {images.length > 1 && (
             <div className="md:hidden absolute bottom-8 text-white/50 text-sm">
               ปัดซ้าย-ขวา เพื่อดูรูปถัดไป
             </div>
          )}
        </div>
      )}
    </>
  );
}
