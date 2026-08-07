import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Users,
  Navigation,
  Phone,
  X,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { PrayerRoom } from "@/types/prayer";
import { Button } from "../ui/button";

interface PrayerRoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: PrayerRoom | null;
}

export function PrayerRoomDetailModal({
  isOpen,
  onClose,
  room,
}: PrayerRoomDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

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
      handleNextImage();
    } else if (distance < -minSwipeDistance) {
      handlePrevImage();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

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

  if (!isOpen || !room) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1,
    );
  };

  const getGoogleMapsNavigationUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/prayer-rooms/${room._id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[1000] backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-label="รายละเอียดห้องละหมาด"
      onClick={onClose}
    >
      <div
        className="
          bg-white shadow-2xl flex flex-col overflow-hidden
          w-full md:w-[500px] lg:w-[600px] xl:w-[700px]                          
          h-[75vh] sm:h-[80vh] md:h-[700px] lg:h-[750px]
          rounded-t-3xl sm:rounded-2xl
          animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-blue-600 text-white p-5 pt-6 sm:pt-5 relative flex-shrink-0">
          {/* Mobile Swipe Handle */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/40 rounded-full sm:hidden"></div>

          <div className="text-xl font-semibold pr-6">{room.name}</div>
          <div className="flex items-center space-x-2 text-sm mt-1.5 text-blue-100">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-2">
              {room.place}, {room.faculty}
            </span>
          </div>
          <div className="absolute top-3 right-4 flex items-center space-x-2">
            <button
              className="text-white/90 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
              onClick={handleCopyLink}
              aria-label="คัดลอกลิงก์"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-300" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
            </button>
            <button
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              onClick={onClose}
              aria-label="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable Content) */}
        <div className="p-6 space-y-4 overflow-y-auto flex-grow">
          {/* Image Gallery */}
          {room.images && room.images.length > 0 && (
            <div
              className="relative w-full"
              style={{ paddingTop: "56.25%" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={room.images[currentImageIndex]}
                alt={`${room.name} ${currentImageIndex + 1}`}
                className="object-cover transition-transform duration-300 rounded-md"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={currentImageIndex === 0}
              />
              {room.images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10" // เพิ่ม z-10
                    onClick={handlePrevImage}
                    aria-label="รูปภาพก่อนหน้า"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10" // เพิ่ม z-10
                    onClick={handleNextImage}
                    aria-label="รูปภาพถัดไป"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10">
                    {" "}
                    {/* เพิ่ม z-10 */}
                    {currentImageIndex + 1} / {room.images.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Description */}
          {room.description && (
            <p className="text-gray-700 text-sm">{room.description}</p>
          )}

          {/* Details (Capacity, Opening Hours, Phone) */}
          <div className="space-y-2">
            {room.capacity !== undefined && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-blue-600" />
                <span>ความจุ : {room.capacity} คน</span>
              </div>
            )}
            {room.openingHours && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>เวลาเปิด : {room.openingHours}</span>
              </div>
            )}
            {room.phone && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>โทร : {room.phone}</span>
              </div>
            )}
          </div>

          {/* Facilities Badges */}
          {room.facilities && room.facilities.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-2">
                สิ่งอำนวยความสะดวก
              </h4>
              <div className="flex flex-wrap gap-2">
                {room.facilities.map((facility, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs border-blue-200 text-blue-700"
                  >
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Video Button (Moved from footer) */}
          {room.youtube_url && (
            <div className="pt-2">
              <a
                href={room.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button
                  className="w-full inline-flex items-center justify-center px-4 py-6 sm:py-2 border border-transparent text-sm sm:text-base font-bold rounded-xl shadow-sm text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none h-full border-red-200"
                  type="button"
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  คลิปวิดีโอนำทาง
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Sticky Modal Footer (Navigation Buttons) */}
        <div className="p-4 sm:p-6 bg-white border-t border-slate-100 flex-shrink-0 flex gap-2 sm:gap-3 sticky bottom-0 z-20 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.05)]">
          <a
            href={
              room.google_map_url ||
              (room.coordinates?.lat && room.coordinates?.lng
                ? getGoogleMapsNavigationUrl(
                    room.coordinates.lat,
                    room.coordinates.lng,
                  )
                : "#")
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              className="w-full inline-flex items-center justify-center px-4 py-6 sm:py-2 border border-transparent text-sm sm:text-base font-bold rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 h-full"
              type="button"
              disabled={!room.coordinates?.lat || !room.coordinates?.lng}
            >
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              นำทาง
              <span className="hidden sm:inline">&nbsp;ด้วย Google Maps</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
