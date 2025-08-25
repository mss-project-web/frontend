import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PrayerRoom , PrayerRoomFromApi } from "@/types/prayer";
import { API_URL } from "@/config";

export function usePrayerRooms() {
  const [prayerRooms, setPrayerRooms] = useState<PrayerRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchPrayerRooms = async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/prayer-rooms`, {
        signal: abortControllerRef.current.signal,
      });
      const roomsFromApi: PrayerRoomFromApi[] = res.data.data;

      const formattedRooms: PrayerRoom[] = roomsFromApi.map((room) => ({
        _id: room._id,
        name: room.name,
        place: room.place,
        faculty: room.faculty,
        coordinates: {
          lat: room.location[0],
          lng: room.location[1],
        },
        images: room.images,
        facilities: room.facilities || [],
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
        description: room.description,
        capacity: room.capacity,
        openingHours: room.openingHours,
        phone: room.phone,
        google_map_url: room.google_map_url,
        youtube_url: room.youtube_url,
      }));

      setPrayerRooms(formattedRooms);
    } catch (err: any) {
      if (err.name !== 'CanceledError') {
        setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerRooms();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { prayerRooms, loading, error, refetch: fetchPrayerRooms };
}
