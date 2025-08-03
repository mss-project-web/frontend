'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrayerRoomDetailModal } from '@/components/prayer-rooms/PrayerRoomDetailModal';
import { PrayerRoom } from "@/types/prayer";
import { usePrayerRooms } from '@/lib/hooks/prayer/usePrayerRooms';
import { Skeleton } from '@/components/ui/skeleton';

const ITEMS_PER_PAGE = 3;

function PrayerRoomCardSkeleton() {
  return (
    <Card className="border-none shadow-md">
      <div className="relative h-48 rounded-t-lg overflow-hidden bg-gray-200 animate-pulse">
        <Skeleton className="w-full h-full rounded-t-lg" />
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-32 rounded-full bg-gray-200 " />
        </div>
      </div>
      <CardContent className="p-5">
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200 " />
        <div className="flex items-center space-x-2 text-gray-600 mb-3 text-sm">
          <Skeleton className="h-4 w-24 bg-gray-200 " />
        </div>
        <Skeleton className="h-10 w-full mb-3 bg-gray-200 " />
        <div className="space-y-2 mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Skeleton className="h-4 w-20 bg-gray-200 " />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Skeleton className="h-4 w-28 bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-200 " />
          <Skeleton className="h-6 w-20 rounded-full bg-gray-200 " />
          <Skeleton className="h-6 w-12 rounded-full bg-gray-200 " />
        </div>
        <Skeleton className="h-10 w-full rounded-md bg-gray-200 " />
      </CardContent>
    </Card>
  );
}

export function PrayerRoomDisplay() {
  const { prayerRooms: initialRooms, loading, error } = usePrayerRooms();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('ทั้งหมด');
  const [selectedRoom, setSelectedRoom] = useState<PrayerRoom | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback((room: PrayerRoom) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRoom(null);
    setIsModalOpen(false);
  }, []);

  const allFaculties = useMemo(() => {
    const facultiesSet = new Set<string>();
    initialRooms.forEach(room => {
      if (room.faculty) facultiesSet.add(room.faculty);
    });
    return Array.from(facultiesSet);
  }, [initialRooms]);

  const filteredRooms = useMemo(() => {
    if (!selectedFaculty || selectedFaculty === 'ทั้งหมด') return initialRooms;
    return initialRooms.filter(room => room.faculty === selectedFaculty);
  }, [initialRooms, selectedFaculty]);

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);

  const currentRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRooms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRooms, currentPage]);

  const goToPage = (page: number) => setCurrentPage(page);
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleFacultySelect = (faculty: string) => {
    setSelectedFaculty(faculty);
    setCurrentPage(1);
  };

  const showSkeleton = loading || !!error;
  const displayRooms = showSkeleton ? Array(ITEMS_PER_PAGE).fill(0) : currentRooms;

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="mb-4 flex justify-end w-full relative -top-4 md:-top-0 lg:-top-0 z-10">
        <Select onValueChange={handleFacultySelect} value={selectedFaculty} disabled={showSkeleton}>
          <SelectTrigger className="w-full sm:w-64 bg-white text-blue-900 border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none !mt-0 md:!mt-0">
            {showSkeleton ? <Skeleton className="h-6 w-3/4" /> : <SelectValue placeholder="เลือกคณะ" />}
          </SelectTrigger>
          <SelectContent className="bg-white border-blue-200 z-50">
            <SelectItem value="ทั้งหมด">ทั้งหมด</SelectItem>
            {allFaculties.map((faculty) => (
              <SelectItem key={faculty} value={faculty}>
                {faculty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {showSkeleton ? (
          displayRooms.map((_, index) => (
            <PrayerRoomCardSkeleton key={index} />
          ))
        ) : (
          currentRooms.length > 0 ? (
            currentRooms.map((room) => (
              <Card
                key={room._id}
                className="
                border-none shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer
                flex flex-col gap-0
              "
                onClick={() => handleOpenModal(room)}
              >
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    className="object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-600 text-white">ห้องละหมาด{room.name}</Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex flex-col flex-grow min-h-[280px]">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">ห้องละหมาด{room.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600 mb-3 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{room.place}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{room.description}</p>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>ความจุ: {room.capacity} คน</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>เปิด: {room.openingHours}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.facilities.slice(0, 3).map((facility, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-700">
                        {facility}
                      </Badge>
                    ))}
                    {room.facilities.length > 3 && (
                      <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                        +{room.facilities.length - 3}
                      </Badge>
                    )}
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(room);
                    }}
                  >
                    ดูรายละเอียด
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">ไม่พบห้องละหมาดในคณะที่เลือก</p>
          )
        )}
      </div>

      {/* Modal */}
      {selectedRoom && (
        <PrayerRoomDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          room={selectedRoom}
        />
      )}
      {!showSkeleton && totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1} className="bg-blue-700 text-white">
            <ChevronLeft className="w-5 h-5 mr-1" />
            ก่อนหน้า
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
            .map((page) => (
              <Button
                key={page}
                onClick={() => goToPage(page)}
                className={`${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-blue-800'
                  } border border-blue-200 min-w-[40px]`}
              >
                {page}
              </Button>
            ))}
          {totalPages > 4 && currentPage + 1 < totalPages && <span className="text-gray-500">...</span>}
          <Button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-blue-700 text-white">
            ถัดไป
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}