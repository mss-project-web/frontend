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

export interface PrayerRoomFromApi {
      _id: string;
      name: string;
      place: string;
      faculty: string;
      location: [number, number];
      openingHours?: string;
      images: string[];
      youtube_url?: string;
      capacity?: number;
      google_map_url?: string;
      facilities?: string[];
      phone?: string;
      description?: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
}

export interface PrayerRoom {
      _id: string;
      name: string;
      place: string;
      faculty: string;
      coordinates: {
            lat: number;
            lng: number;
      };
      images: string[];
      facilities: string[];
      createdAt: string;
      updatedAt: string;
      description?: string;
      capacity?: number;
      openingHours?: string;
      phone?: string;
      google_map_url?: string;
      youtube_url?: string;
}