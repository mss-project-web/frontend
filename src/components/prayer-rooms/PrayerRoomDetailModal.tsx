import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Star, Navigation, Phone, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PrayerRoom } from '@/types/prayer';

interface PrayerRoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: PrayerRoom | null;
}

export function PrayerRoomDetailModal({ isOpen, onClose, room }: PrayerRoomDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !room) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
      role="dialog"
      aria-label="รายละเอียดห้องละหมาด"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-[95vw] md:max-w-lg rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-blue-600 text-white p-4 relative">
          <div className="text-xl font-semibold">{room.name}</div>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span>{room.address}</span>
          </div>
          <button
            className="absolute top-2 right-2 text-white hover:text-blue-200"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="relative h-48 rounded-md overflow-hidden">
            <Image
              src={room.images[currentImageIndex] || '/placeholder.svg'}
              alt={`${room.name} ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              loading="lazy"
            />
            {room.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  onClick={handlePrevImage}
                  aria-label="รูปภาพก่อนหน้า"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  onClick={handleNextImage}
                  aria-label="รูปภาพถัดไป"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {currentImageIndex + 1} / {room.images.length}
                </div>
              </>
            )}
          </div>
          <p className="text-gray-700 text-sm">{room.description}</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-blue-600" />
              <span>ความจุ: {room.capacity}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>เวลาเปิด: {room.openHours}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>โทร: {room.phone}</span>
            </div>
            {room.rating && room.reviews !== undefined && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-blue-600" />
                <span>คะแนน: {room.rating} ({room.reviews} รีวิว)</span>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">สิ่งอำนวยความสะดวก</h4>
            <div className="flex flex-wrap gap-2">
              {room.facilities.map((facility, index) => (
                <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-700">
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Navigation className="w-4 h-4 mr-2" />
              นำทางไปยังห้องละหมาด
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}