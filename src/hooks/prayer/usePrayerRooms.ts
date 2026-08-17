import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PrayerRoom, PrayerRoomFromApi } from "@/types/prayer";
import { API_URL } from "@/config";
import { mapPrayerRoom } from "@/services/prayer";

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

    abortControllerRef.current = new AbortController();
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/prayer-rooms`, {
        signal: abortControllerRef.current.signal,
      });
      const roomsFromApi: PrayerRoomFromApi[] = res.data.data;

      // Use shared mapper from service — no duplication
      setPrayerRooms(roomsFromApi.map(mapPrayerRoom));
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

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { prayerRooms, loading, error, refetch: fetchPrayerRooms };
}
