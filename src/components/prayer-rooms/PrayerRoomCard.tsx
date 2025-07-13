'use client';

import Image from 'next/image';
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrayerRoomDetailModal } from '@/components/prayer-rooms/PrayerRoomDetailModal';
import { PrayerRoom } from "@/types/prayer";

interface PrayerRoomDisplayProps {
  initialRooms: PrayerRoom[];
}

const ITEMS_PER_PAGE = 3;

export function PrayerRoomDisplay({ initialRooms }: PrayerRoomDisplayProps) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Select */}
      <div className="mb-8 flex justify-end">
        <Select onValueChange={handleFacultySelect} value={selectedFaculty}>
          <SelectTrigger className="w-[180px] px-6 py-2 border-blue-400 text-blue-700 hover:bg-blue-50">
            <SelectValue placeholder="เลือกคณะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ทั้งหมด">ทั้งหมด</SelectItem>
            {allFaculties.map((faculty) => (
              <SelectItem key={faculty} value={faculty}>
                {faculty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRooms.length > 0 ? (
          currentRooms.map((room) => (
            <Card
              key={room.id}
              className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleOpenModal(room)}
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={room.images[0] || '/placeholder.svg'}
                  alt={room.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-blue-600 text-white">ห้อง {room.id}</Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{room.name}</h3>
                <div className="flex items-center space-x-2 text-gray-600 mb-3 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{room.address}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{room.description}</p>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>ความจุ: {room.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>เปิด: {room.openHours}</span>
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal(room);
                }}>
                  ดูรายละเอียด
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">ไม่พบห้องละหมาดในคณะที่เลือก</p>
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

      {/* Pagination */}
      {totalPages > 1 && (
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
                className={`${
                  currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-blue-800'
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
