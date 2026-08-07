"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Navigation,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PrayerRoom } from "@/types/prayer";
import { usePrayerRooms } from "@/hooks/prayer/usePrayerRooms";
import { Skeleton } from "@/components/ui/skeleton";
import { PrayerRoomDetailModal } from "./PrayerRoomDetailModal";

const ITEMS_PER_PAGE = 6;

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

function PrayerRoomCardSkeleton() {
  return (
    <Card className="border-none shadow-md">
      <div className="relative h-32 md:h-48 rounded-t-lg overflow-hidden bg-gray-200 animate-pulse">
        <Skeleton className="w-full h-full rounded-t-lg" />
        <div className="absolute top-2 md:top-3 left-2 md:left-3">
          <Skeleton className="h-4 md:h-6 w-24 md:w-32 rounded-full bg-gray-200 " />
        </div>
      </div>
      <CardContent className="p-3 md:p-5">
        <Skeleton className="h-5 md:h-6 w-3/4 mb-2 bg-gray-200 " />
        <div className="flex items-center space-x-2 text-gray-600 mb-2 md:mb-3 text-xs md:text-sm">
          <Skeleton className="h-3 md:h-4 w-24 bg-gray-200 " />
        </div>
        <Skeleton className="h-8 md:h-10 w-full mb-2 md:mb-3 bg-gray-200 " />
        <div className="space-y-1.5 md:space-y-2 mb-2 md:mb-3">
          <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
            <Skeleton className="h-3 md:h-4 w-20 bg-gray-200 " />
          </div>
          <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
            <Skeleton className="h-3 md:h-4 w-28 bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
          <Skeleton className="h-5 md:h-6 w-12 md:w-16 rounded-full bg-gray-200 " />
          <Skeleton className="h-5 md:h-6 w-16 md:w-20 rounded-full bg-gray-200 " />
          <Skeleton className="h-5 md:h-6 w-10 md:w-12 rounded-full bg-gray-200 hidden md:flex" />
        </div>
        <Skeleton className="h-8 md:h-10 w-full rounded-md bg-gray-200 " />
      </CardContent>
    </Card>
  );
}

export function PrayerRoomDisplay() {
  const { prayerRooms: initialRooms, loading, error } = usePrayerRooms();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("ทั้งหมด");
  const [selectedRoomModal, setSelectedRoomModal] = useState<PrayerRoom | null>(null);
  const isMobile = useIsMobile();
  const listRef = useRef<HTMLDivElement | null>(null);

  const allFaculties = useMemo(() => {
    const facultiesSet = new Set<string>();
    initialRooms.forEach((room) => {
      if (room.faculty) facultiesSet.add(room.faculty);
    });
    return Array.from(facultiesSet);
  }, [initialRooms]);

  const processedRooms = useMemo(() => {
    let rooms: PrayerRoom[] = [...initialRooms];

    if (selectedFaculty && selectedFaculty !== "ทั้งหมด") {
      rooms = rooms.filter((room) => room.faculty === selectedFaculty);
    }

    return rooms;
  }, [initialRooms, selectedFaculty]);

  const totalPages = Math.ceil(processedRooms.length / ITEMS_PER_PAGE);

  const currentRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedRooms.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedRooms, currentPage]);

  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setTimeout(scrollToList, 100);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(scrollToList, 100);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setTimeout(scrollToList, 100);
    }
  };

  const handleFacultySelect = (faculty: string) => {
    setSelectedFaculty(faculty);
    setCurrentPage(1);
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const pagesToShow = useMemo(() => {
    if (isMobile) {
      return [1, currentPage, totalPages]
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => a - b);
    } else {
      return Array.from({ length: totalPages }, (_, i) => i + 1).filter(
        (page) =>
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1),
      );
    }
  }, [currentPage, totalPages, isMobile]);

  const showSkeleton = loading || !!error;
  const displayRooms = showSkeleton
    ? Array(ITEMS_PER_PAGE).fill(0)
    : currentRooms;

  return (
    <div className="container mx-auto py-4">
      <div
        ref={listRef}
        className="mb-4 flex flex-col sm:flex-row justify-end items-start sm:items-center w-full relative -top-4 md:-top-0 lg:-top-0 z-10 gap-3"
      >
        <Select
          onValueChange={handleFacultySelect}
          value={selectedFaculty}
          disabled={showSkeleton}
        >
          <SelectTrigger className="w-full sm:w-64 bg-white text-black border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-white dark:text-black">
            {showSkeleton ? (
              <Skeleton className="h-6 w-3/4" />
            ) : (
              <SelectValue placeholder="เลือกคณะ" />
            )}
          </SelectTrigger>
          <SelectContent className="bg-white text-black border-blue-200 z-50 dark:bg-white dark:text-black">
            <SelectItem
              value="ทั้งหมด"
              className="hover:bg-blue-50 text-black dark:text-black"
            >
              ทั้งหมด
            </SelectItem>
            {allFaculties.map((faculty) => (
              <SelectItem
                key={faculty}
                value={faculty}
                className="hover:bg-blue-50 text-black dark:text-black"
              >
                {faculty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {showSkeleton ? (
          displayRooms.map((_, index) => <PrayerRoomCardSkeleton key={index} />)
        ) : currentRooms.length > 0 ? (
          currentRooms.map((room) => (
            <div key={room._id} onClick={() => setSelectedRoomModal(room)} className="group flex flex-col h-full cursor-pointer">
            <Card
              className="
                border-none shadow-md group-hover:shadow-lg transition-shadow duration-300
                flex flex-col gap-0 h-full
              "
            >
              <div className="relative h-32 md:h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  className="object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 md:top-3 left-2 md:left-3 right-2 md:right-auto overflow-hidden flex flex-col gap-1 items-start">
                  <Badge className="bg-blue-600 text-white text-[10px] md:text-xs px-2 py-0 md:px-2.5 md:py-0.5 truncate max-w-full block w-fit">
                    ห้องละหมาด{room.name}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-3 md:p-5 flex flex-col flex-grow min-h-[200px] md:min-h-[280px]">
                <h1 className="text-lg md:text-2xl font-semibold text-blue-900 mb-1 md:mb-2 leading-tight md:leading-normal">
                  ห้องละหมาด{room.name}
                </h1>
                <div className="flex items-start space-x-1 md:space-x-2 text-gray-600 mb-2 md:mb-3 text-[11px] md:text-sm">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 shrink-0 mt-[2px] md:mt-[3px]" />
                  <span>{room.place}</span>
                </div>
                <p className="text-gray-600 text-[11px] md:text-sm mb-2 md:mb-3 line-clamp-3 md:line-clamp-2 leading-relaxed md:leading-normal">
                  {room.description}
                </p>
                <div className="space-y-1.5 md:space-y-2 mb-2 md:mb-3">
                  <div className="flex items-start space-x-1.5 md:space-x-2 text-[11px] md:text-sm text-gray-600">
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-blue-600 shrink-0 mt-[2px] md:mt-[3px]" />
                    <span>ความจุ: {room.capacity} คน</span>
                  </div>
                  <div className="flex items-start space-x-1.5 md:space-x-2 text-[11px] md:text-sm text-gray-600">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-600 shrink-0 mt-[2px] md:mt-[3px]" />
                    <span>เปิด: {room.openingHours}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                  {room.facilities.slice(0, 10).map((facility, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-[9px] md:text-xs px-1.5 md:px-2.5 py-0 md:py-0.5 border-blue-200 text-blue-700 whitespace-nowrap"
                    >
                      {facility}
                    </Badge>
                  ))}
                  {room.facilities.length > 10 && (
                    <Badge
                      variant="outline"
                      className="text-[9px] md:text-xs px-1.5 md:px-2.5 py-0 md:py-0.5 border-blue-200 text-blue-700"
                    >
                      +{room.facilities.length - 10}
                    </Badge>
                  )}
                </div>
                <div
                  className="w-full bg-blue-600 group-hover:bg-blue-700 text-white mt-auto text-xs md:text-sm h-8 md:h-10 px-2 md:px-4 flex items-center justify-center rounded-md font-medium transition-colors"
                >
                  ดูรายละเอียด
                </div>
              </CardContent>
            </Card>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            ไม่พบห้องละหมาดในคณะที่เลือก
          </p>
        )}
      </div>

      {!showSkeleton && totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2 font-medium overflow-x-auto px-0 whitespace-nowrap">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-0 rounded-md px-3 py-2 transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            aria-label="ไปหน้าก่อนหน้า"
          >
            <ChevronLeft className="w-5 h-5" />
            ก่อนหน้า
          </Button>

          {pagesToShow.map((page, idx, arr) => {
            const isPreviousPageSkipped = idx > 0 && page - arr[idx - 1] > 1;

            return (
              <React.Fragment key={page}>
                {isPreviousPageSkipped && (
                  <span className="px-2 text-gray-400 select-none">...</span>
                )}
                <Button
                  onClick={() => goToPage(page)}
                  className={`min-w-[40px] rounded-md px-3 py-2 transition ${
                    currentPage === page
                      ? "bg-blue-700 text-white shadow-md"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`ไปหน้า ${page}`}
                >
                  {page}
                </Button>
              </React.Fragment>
            );
          })}

          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 rounded-md px-3 py-2 transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            aria-label="ไปหน้าถัดไป"
          >
            ถัดไป
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      <PrayerRoomDetailModal 
        isOpen={!!selectedRoomModal} 
        onClose={() => setSelectedRoomModal(null)} 
        room={selectedRoomModal} 
      />
    </div>
  );
}
