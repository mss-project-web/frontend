import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Navigation, Phone, X, ChevronLeft, ChevronRight, Youtube } from 'lucide-react';
import { PrayerRoom } from '@/types/prayer';
import { Button } from '../ui/button';

interface PrayerRoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: PrayerRoom | null;
}

export function PrayerRoomDetailModal({ isOpen, onClose, room }: PrayerRoomDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !room) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const getGoogleMapsNavigationUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      role="dialog"
      aria-label="รายละเอียดห้องละหมาด"
      onClick={onClose}
    >
      <div
        className="
          bg-white rounded-lg shadow-xl transform transition-all duration-300 scale-100
          w-full md:w-[500px] lg:w-[600px] xl:w-[700px]                          
          h-[650px] md:h-[700px] lg:h-[750px]                                    
          flex flex-col overflow-hidden                                
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-blue-600 text-white p-4 relative flex-shrink-0">
          <div className="text-xl font-semibold">{room.name}</div>
          <div className="flex items-center space-x-2 text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span>{room.place}, {room.faculty}</span>
          </div>
          <button
            className="absolute top-2 right-2 text-white hover:text-blue-200"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 pb-0 flex-shrink-0 flex justify-end">
          <a
            href={room.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={!room.coordinates?.lat || !room.coordinates?.lng}
            >
              <Youtube className="w-4 h-4 mr-2" />
              คลิปนำทาง
            </Button>
          </a>
        </div>


        {/* Modal Body (Scrollable Content) */}
        <div className="p-6 space-y-4 overflow-y-auto flex-grow">
          {/* Image Gallery */}
          {room.images && room.images.length > 0 && (
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
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
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10"> {/* เพิ่ม z-10 */}
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
                <span>ความจุ: {room.capacity}</span>
              </div>
            )}
            {room.openingHours && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>เวลาเปิด: {room.openingHours}</span>
              </div>
            )}
            {room.phone && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>โทร: {room.phone}</span>
              </div>
            )}
          </div>

          {/* Facilities Badges */}
          {room.facilities && room.facilities.length > 0 && (
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
          )}
        </div>

        {/* Modal Footer (Navigation Button) */}
        <div className="p-6 pt-0 flex-shrink-0">
          <a
            href={room.coordinates?.lat && room.coordinates?.lng ? getGoogleMapsNavigationUrl(room.coordinates.lat, room.coordinates.lng) : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={!room.coordinates?.lat || !room.coordinates?.lng}
            >
              <Navigation className="w-4 h-4 mr-2" />
              นำทางไปยังห้องละหมาด
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}