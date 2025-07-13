export interface Prayer {
      name: string;
      time: string;
      icon: React.ReactNode;
}

export interface PrayerTimes {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
      thaiDate: string;
}

export interface PrayerRoom {
      id: number;
      name: string;
      address: string;
      coordinates: { lat: number; lng: number };
      images: string[];
      faculty: string;
      capacity: string;
      openHours: string;
      facilities: string[];
      phone: string;
      description: string;
      rating?: number;
      reviews?: number;
}