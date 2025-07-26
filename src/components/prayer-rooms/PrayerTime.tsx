'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Clock, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { getTodayPrayerTimes } from '@/lib/getPrayerTimes';
import { Prayer } from '@/types/prayer';

export function PrayerTime() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [date, setDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: string;
    remaining: string;
  } | null>(null);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

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
          remaining:
            remainingHours > 0
              ? `${remainingHours} ชั่วโมง ${remainingMinutes} นาที`
              : `${remainingMinutes} นาที`,
        };
      }
    }

    return null;
  }, []);

  const getPrayerIcons = () => ({
    Fajr: <Sunrise className="text-amber-500" size={24} />,
    Dhuhr: <Sun className="text-yellow-500" size={24} />,
    Asr: <Sun className="text-orange-500" size={24} />,
    Maghrib: <Sunset className="text-orange-600" size={24} />,
    Isha: <Moon className="text-indigo-600" size={24} />,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const times = await getTodayPrayerTimes();
      const prayerIcons = getPrayerIcons();

      if (times) {
        const prayerData: Prayer[] = [
          { name: 'ฟัจร์', time: times.Fajr, icon: prayerIcons.Fajr },
          { name: 'ซุฮร์', time: times.Dhuhr, icon: prayerIcons.Dhuhr },
          { name: 'อัศร์', time: times.Asr, icon: prayerIcons.Asr },
          { name: 'มัฆริบ', time: times.Maghrib, icon: prayerIcons.Maghrib },
          { name: 'อิชา', time: times.Isha, icon: prayerIcons.Isha },
        ];
        setPrayers(prayerData);
        setDate(times.thaiDate);
        setNextPrayer(calculateNextPrayer(prayerData));
      }

      setIsLoading(false);
    };

    fetchData();
  }, [calculateNextPrayer]);

  return (
    <>
      {nextPrayer && (
        <section className="mx-auto">
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

      {/* Compact Section */}
      <section className="py-4">
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
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 sm:rounded-xl sm:px-6 sm:py-3 font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
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

      {/* Modal */}
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
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">{prayer.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{prayer.name}</h3>
                          <p className="text-sm text-gray-600">เวลาละหมาด</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {prayer.time.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Source */}
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
    </>
  );
}
