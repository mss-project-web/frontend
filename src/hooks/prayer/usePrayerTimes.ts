import axios from "axios";
import { PrayerTimes } from "@/types/prayer";

const formatThaiDate = (date: Date): string => {
  const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543;

  return `${dayName}ที่ ${day} ${month} ${year}`;
};

export const usePrayerTimes = async (): Promise<PrayerTimes | null> => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  try {
    const response = await axios.get(
      `https://api.aladhan.com/v1/calendarByAddress/${year}/${month}`,
      {
        params: {
          address: "Songkhla, Thailand",
          method: 3, 
        },
      }
    );

    const dayData = response.data.data[date - 1];
    const timings = dayData.timings;

    return {
      Fajr: timings.Fajr,
      Dhuhr: timings.Dhuhr,
      Asr: timings.Asr,
      Maghrib: timings.Maghrib,
      Isha: timings.Isha,
      thaiDate: formatThaiDate(today),
    };
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
};