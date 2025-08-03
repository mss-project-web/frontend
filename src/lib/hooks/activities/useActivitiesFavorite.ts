import { useState, useEffect } from "react";
import axios from "axios";
import { ActivitiesFavorites } from "@/types/activities";
import { API_URL } from "@/config";

export function useFavoriteActivities() {
  const [activities, setActivities] = useState<ActivitiesFavorites[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/activities/favorites`);

      const rawData = Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.data?.data)
        ? res.data.data.data
        : [];

      const formatted: ActivitiesFavorites[] = rawData.map((activity: ActivitiesFavorites) => ({
        _id: activity._id,
        name_th: activity.name_th,
        name_eng: activity.name_eng,
        location: activity.location,
        description: activity.description,
        favorite: activity.favorite,
        images: Array.isArray(activity.images)
          ? activity.images
          : activity.images
          ? [activity.images]
          : [],
      }));

      setActivities(formatted);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลกิจกรรมที่ชื่นชอบ");
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return { activities, loading, error, refetch: fetchActivities };
}
