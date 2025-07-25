'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ExternalLink, Clock } from 'lucide-react';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import dynamic from "next/dynamic";

// components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PrayerRoomDisplay } from '@/components/prayer-rooms/PrayerRoomCard';

//API & interface
import { getTodayPrayerTimes } from "@/lib/getPrayerTimes";
import { PrayerRoom, Prayer } from '@/types/prayer';
import { usePrayerRooms } from '@/lib/hooks/usePrayerRooms';

export default function PrayerRoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [date, setDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: string } | null>(null);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
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

  const calculateNextPrayer = useCallback((prayerTimes: Prayer[]) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (const prayer of prayerTimes) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;

      if (prayerTime > currentTime) {
        const remaining = prayerTime - currentTime;
        const remainingHours = Math.floor(remaining / 60);
        const remainingMinutes = remaining % 60;

        return {
          name: prayer.name,
          time: prayer.time,
          remaining: remainingHours > 0
            ? `${remainingHours} ชั่วโมง ${remainingMinutes} นาที`
            : `${remainingMinutes} นาที`
        };
      }
    }
    return null;
  }, []);

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
        const prayerData = [
          { name: "ฟัจร์", time: times.Fajr, icon: prayerIcons.Fajr },
          { name: "ซุฮร์", time: times.Dhuhr, icon: prayerIcons.Dhuhr },
          { name: "อัศร์", time: times.Asr, icon: prayerIcons.Asr },
          { name: "มัฆริบ", time: times.Maghrib, icon: prayerIcons.Maghrib },
          { name: "อิชา", time: times.Isha, icon: prayerIcons.Isha },
        ];
        setPrayers(prayerData);
        setDate(times.thaiDate);
        setNextPrayer(calculateNextPrayer(prayerData));
      }
      setIsLoading(false);
    };

    fetchData();
  }, [calculateNextPrayer]);

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

  const getPrayerIcons = () => ({
    Fajr: <Sunrise className="text-amber-500" size={24} />,
    Dhuhr: <Sun className="text-yellow-500" size={24} />,
    Asr: <Sun className="text-orange-500" size={24} />,
    Maghrib: <Sunset className="text-orange-600" size={24} />,
    Isha: <Moon className="text-indigo-600" size={24} />,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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

      {/* Next Prayer Alert */}
      {nextPrayer && (
        <section className="py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock size={18} />
                <span className="font-medium">
                  ละหมาดต่อไป: {nextPrayer.name} เวลา {nextPrayer.time}
                  <span className="ml-2 text-green-100">({nextPrayer.remaining})</span>
                </span>
              </div>
              <button
                onClick={() => setIsPrayerModalOpen(true)}
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
              >
                ดูทั้งหมด
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Prayer Times Section - Compact version */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 sm:p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">เวลาละหมาดวันนี้</h2>
                  <p className="text-blue-100 text-sm sm:text-base">{date}</p>
                  <p className="text-blue-100 text-sm sm:text-base">• หาดใหญ่, สงขลา</p>
                </div>
                <button
                  onClick={() => setIsPrayerModalOpen(true)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 sm:rounded-xl sm:px-6 sm:py-3 
                       font-medium transition-all duration-200 flex items-center 
                       space-x-1 sm:space-x-2 text-sm sm:text-base"
                >
                  <Clock size={15} />
                  <span className="hidden sm:inline">ดูเวลาละหมาด</span>
                  <span className="inline sm:hidden">ดู</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Times Modal */}
      {isPrayerModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold mb-2">เวลาละหมาดประจำวัน</div>
                  <p className="text-blue-100">{date}</p>
                  <p className="text-blue-100">• หาดใหญ่, สงขลา</p>
                </div>
                <button
                  onClick={() => setIsPrayerModalOpen(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {prayers.map((prayer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          {prayer.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{prayer.name}</h3>
                          <p className="text-sm text-gray-600">เวลาละหมาด</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{prayer.time.split(" ")[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Source attribution */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span>ข้อมูลจาก:</span>
                  <a
                    href="https://whitechannel.tv/solahtimes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span>whitechannel.tv</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Map Section */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">รายการห้องละหมาดทั้งหมด</h2>
            <p className="text-gray-600 text-lg">ห้องละหมาดที่มีให้บริการในมหาวิทยาลัย</p>
          </div>
          <PrayerRoomDisplay initialRooms={prayerRooms} />
        </div>
      </section>

      {/* Enhanced Guidelines Section */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-3">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">แนวทางการใช้ห้องละหมาด</h2>
            <p className="text-sm sm:text-lg text-gray-600">กฎและข้อปฏิบัติสำหรับการใช้ห้องละหมาดอย่างเหมาะสม</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl font-bold flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span>สิ่งที่ควรทำ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ul className="space-y-3">
                  {[
                    { text: "ถอดรองเท้าก่อนเข้าห้องละหมาด", icon: "👟" },
                    { text: "รักษาความเงียบและสงบ", icon: "🤫" },
                    { text: "ทำความสะอาดหลังใช้งาน", icon: "🧹" },
                    { text: "แต่งกายสุภาพเรียบร้อย", icon: "👔" },
                    { text: "เคารพผู้ที่กำลังละหมาด", icon: "🤲" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 group">
                      <div className="text-xl">{item.icon}</div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-700">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl font-bold flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span>สิ่งที่ไม่ควรทำ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ul className="space-y-3">
                  {[
                    { text: "ห้ามใช้โทรศัพท์เสียงดัง", icon: "📵" },
                    { text: "ห้ามนำอาหารเข้าไป", icon: "🚫" },
                    { text: "ห้ามสูบบุหรี่", icon: "🚭" },
                    { text: "ห้ามใช้เป็นที่นอน", icon: "🛏️" },
                    { text: "ห้ามรบกวนผู้อื่น", icon: "🔇" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3 group">
                      <div className="text-xl">{item.icon}</div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-700">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}