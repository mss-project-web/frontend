'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import dynamic from "next/dynamic";

// components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrayerRoomDisplay } from '@/components/prayer-rooms/PrayerRoomCard';
import { PrayerRoomDetailModal } from '@/components/prayer-rooms/PrayerRoomDetailModal';

//API & interface
import { getTodayPrayerTimes } from "@/lib/getPrayerTimes";
import { PrayerRoom, Prayer } from '@/types/prayer';

//MockData
import { prayerRoomsData } from '@/data/prayerRoomsData';

export default function PrayerRoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [date, setDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const prayerRooms: PrayerRoom[] = prayerRoomsData;

  const handleMarkerClick = useCallback((roomId: number) => {
    setSelectedRoom(roomId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  }, []);

  const selectedRoomData: PrayerRoom | null = selectedRoom
    ? prayerRooms.find((room) => room.id === selectedRoom) ?? null
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const times = await getTodayPrayerTimes();
      const prayerIcons = getPrayerIcons();

      if (times) {
        setPrayers([
          { name: "ฟัจร์", time: times.Fajr, icon: prayerIcons.Fajr },
          { name: "ซุฮร์", time: times.Dhuhr, icon: prayerIcons.Dhuhr },
          { name: "อัศร์", time: times.Asr, icon: prayerIcons.Asr },
          { name: "มัฆริบ", time: times.Maghrib, icon: prayerIcons.Maghrib },
          { name: "อิชา", time: times.Isha, icon: prayerIcons.Isha },
        ]);
        setDate(times.thaiDate);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const PrayerRoomMap = dynamic(
    () =>
      import("@/components/prayer-rooms/PrayerRoomMap").then((mod) => mod.PrayerRoomMap),
    {
      ssr: false,
      loading: () => (
        <div className="w-full h-96 flex items-center justify-center text-blue-600 text-lg animate-pulse">
          กำลังโหลดแผนที่...
        </div>
      ),
    }
  )


  const getPrayerIcons = () => ({
    Fajr: <Sunrise className="mx-auto text-yellow-400" size={32} />,
    Dhuhr: <Sun className="mx-auto text-yellow-500" size={32} />,
    Asr: <Sun className="mx-auto text-yellow-600" size={32} />,
    Maghrib: <Sunset className="mx-auto text-orange-500" size={32} />,
    Isha: <Moon className="mx-auto text-indigo-600" size={32} />,
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <nav className="mb-6 flex items-center justify-center space-x-2 text-base text-white">
              <Link href="/" className="hover:underline hover:text-blue-100 transition-colors">
                หน้าหลัก
              </Link>
              <span className="text-gray-400">/</span>
              <span className="font-medium text-blue-100 flex items-center space-x-1">
                <span>สถานที่ละหมาด</span>
              </span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ห้องละหมาด</h1>
            <p className="text-lg md:text-xl opacity-90">
              ค้นหาห้องละหมาดที่สะดวกในมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">แผนที่ห้องละหมาด</h2>
            <p className="text-lg text-gray-600 mt-2">เลือกจุดบนแผนที่เพื่อดูรายละเอียดห้องละหมาด</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <PrayerRoomMap
              prayerRooms={prayerRooms}
              selectedRoom={selectedRoom}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
        <PrayerRoomDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          room={selectedRoomData}
        />
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-3xl font-bold text-blue-900">รายการห้องละหมาดทั้งหมด</div>
            <p className="text-lg text-gray-600 mt-2">ห้องละหมาดที่มีให้บริการในมหาวิทยาลัย</p>
          </div>
          <PrayerRoomDisplay initialRooms={prayerRooms} />
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">เวลาละหมาดประจำวัน</h2>
            <p className="text-lg text-gray-600 mt-2">เวลาละหมาดสำหรับวันนี้ในเขตหาดใหญ่</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-blue-600 text-white text-center rounded-t-lg">
                <CardTitle className="text-xl">เวลาละหมาดวันนี้</CardTitle>
                <p className="text-blue-100 text-sm">{date}</p>
                <p className="text-blue-100 text-sm">หาดใหญ่, สงขลา</p>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="text-center text-gray-500 text-lg py-12 animate-pulse">
                    กำลังโหลดเวลาละหมาด...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {prayers.map((prayer, index) => (
                      <div key={index} className="text-center p-4 bg-white rounded-md">
                        <div className="text-3xl mb-2">{prayer.icon}</div>
                        <h3 className="text-base font-semibold text-blue-900">{prayer.name}</h3>
                        <p className="text-lg font-bold text-blue-600">{prayer.time.split(" ")[0]}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <div className="text-center">
                <div className="inline-flex items-center justify-center bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
                  <span className="text-sm text-gray-600 mr-2">สามารถเปรียบเทียบจาก:</span>
                  <a
                    href="https://whitechannel.tv/solahtimes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    whitechannel.tv
                  </a>
                  <ExternalLink className="w-4 h-4 ml-2 text-gray-500" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">แนวทางการใช้ห้องละหมาด</h2>
            <p className="text-lg text-gray-600 mt-2">กฎและข้อปฏิบัติสำหรับการใช้ห้องละหมาด</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">สิ่งที่ควรทำ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>ถอดรองเท้าก่อนเข้าห้องละหมาด</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>รักษาความเงียบและสงบ</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>ทำความสะอาดหลังใช้งาน</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>แต่งกายสุภาพเรียบร้อย</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <span>เคารพผู้ที่กำลังละหมาด</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-red-600">สิ่งที่ไม่ควรทำ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                    <span>ห้ามใช้โทรศัพท์เสียงดัง</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                    <span>ห้ามนำอาหารเข้าไป</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                    <span>ห้ามสูบบุหรี่</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                    <span>ห้ามใช้เป็นที่นอน</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                    <span>ห้ามรบกวนผู้อื่น</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}