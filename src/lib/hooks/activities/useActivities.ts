import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Activity } from "@/types/activities";
import { API_URL } from "@/config";

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchActivities = async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/activities`, {
        signal: abortControllerRef.current.signal,
      });

      const activitiesFromApi = Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.data?.data)
        ? res.data.data.data
        : [];

      const formattedActivities: Activity[] = activitiesFromApi.map((activity: Activity) => ({
        _id: activity._id,
        name_th: activity.name_th,
        name_eng: activity.name_eng,
        location: activity.location,
        description: activity.description,
        favorite: activity.favorite,
        images: activity.images,
      }));

      setActivities(formattedActivities);
      setError(null);
    } catch (err: any) {
      if (err.name !== 'CanceledError') {
        setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลกิจกรรม");
        setActivities([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { activities, loading, error, refetch: fetchActivities };
}
