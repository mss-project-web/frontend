'use client';

import Link from 'next/link';
import dynamic from "next/dynamic";

// components
import { Card, CardContent } from '@/components/ui/card';
import { PrayerRoomDisplay } from '@/components/prayer-rooms/PrayerRoomCard';
import { Guidelines } from '@/components/prayer-rooms/Guidelines';
import { PrayerTime } from '@/components/prayer-rooms/PrayerTime';

export default function PrayerRoomsPage() {
  const PrayerRoomMap = dynamic(
    () => import('@/components/prayer-rooms/PrayerRoomMap').then((mod) => mod.default),
    {
      ssr: false,
    }
  );

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
            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight pt-8">
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
            <h2 className="text-3xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">แผนที่ห้องละหมาด</h2>
            <p className="text-gray-600 text-lg mb-4">คลิกที่จุดบนแผนที่เพื่อดูรายละเอียดห้องละหมาด</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <PrayerRoomMap />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prayer Rooms List */}
      <section className="py-10 bg-gradient-to-br">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">รายการห้องละหมาดทั้งหมด</h2>
            <p className="text-gray-600 text-lg">ห้องละหมาดที่มีให้บริการในมหาวิทยาลัย</p>
          </div>
          <PrayerRoomDisplay />
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