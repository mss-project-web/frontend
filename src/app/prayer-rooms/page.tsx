'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import dynamic from "next/dynamic";

// components
import { Card, CardContent } from '@/components/ui/card';
import { PrayerRoomDisplay } from '@/components/prayer-rooms/PrayerRoomCard';
import { Guidelines } from '@/components/prayer-rooms/Guidelines';
import { PrayerTime } from '@/components/prayer-rooms/PrayerTime';

//API & interface
import { PrayerRoom } from '@/types/prayer';
import { usePrayerRooms } from '@/lib/hooks/usePrayerRooms';

export default function PrayerRoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { prayerRooms } = usePrayerRooms();

  const handleMarkerClick = useCallback((roomId: number) => {
    setSelectedRoom(roomId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  }, []);

  const selectedRoomData: PrayerRoom | null = selectedRoom
    ? prayerRooms.find((room) => room._id === selectedRoom?.toString()) ?? null
    : null;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen, handleCloseModal]);

  const PrayerRoomMap = dynamic(
    () =>
      import("@/components/prayer-rooms/PrayerRoomMap").then((mod) => mod.default),
    {
      ssr: false,
      loading: () => (
        <div className="w-full h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดแผนที่...</p>
          </div>
        </div>
      ),
    }
  )

  return (
    <main className="relative min-h-screen font-sans overflow-hidden bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-10 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center space-x-2 text-base text-white">
              <Link href="/" className="hover:underline hover:text-blue-100 transition-colors">
                หน้าหลัก
              </Link>
              <span className="text-gray-400">/</span>
              <span className="font-medium text-blue-100 flex items-center space-x-1">
                <span>ห้องละหมาด</span>
              </span>
            </nav>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              ห้องละหมาด
              <span className="block text-3xl md:text-4xl font-medium text-blue-200 mt-2">
                มหาวิทยาลัยสงขลานครินทร์
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
              ค้นหาห้องละหมาดที่สะดวกและเหมาะสมสำหรับการละหมาด
            </p>
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="py-5 bg-gradient-to-br bg-sky-50">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto">
            <PrayerTime />
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-10 bg-gradient-to-br">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">แผนที่ห้องละหมาด</h2>
            <p className="text-gray-600 text-lg">คลิกที่จุดบนแผนที่เพื่อดูรายละเอียดห้องละหมาด</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <PrayerRoomMap
                  prayerRooms={prayerRooms}
                  selectedRoom={selectedRoom}
                  onMarkerClick={handleMarkerClick}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prayer Rooms List */}
      <section className="py-10 bg-gradient-to-br">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">รายการห้องละหมาดทั้งหมด</h2>
            <p className="text-gray-600 text-lg">ห้องละหมาดที่มีให้บริการในมหาวิทยาลัย</p>
          </div>
          <PrayerRoomDisplay initialRooms={prayerRooms} />
        </div>
      </section>

      {/* Enhanced Guidelines Section */}
      <section className="py-10 bg-gradient-to-br bg-sky-50">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto">
            <Guidelines />
          </div>
        </div>
      </section>
    </main>
  );
}