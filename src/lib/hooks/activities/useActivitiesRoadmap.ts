import { useState, useEffect } from "react";
import axios from "axios";
import { ActivityRoadmap } from "@/types/activities";
import { API_URL } from "@/config";

interface RawActivityRoadmap {
  _id: string;
  name_th: string;
  name_eng: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
}

export function useAllActivitiesRoadmap() {
  const [activityRoadmap, setActivityRoadmap] = useState<ActivityRoadmap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllActivities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/activities/roadmap`);

      const data: RawActivityRoadmap[] = Array.isArray(res.data.data?.data)
        ? res.data.data.data
        : [];

      const formatted = data.map((item) => ({
        _id: item._id,
        name_th: item.name_th,
        name_eng: item.name_eng,
        location: item.location,
        description: item.description,
        start_date: item.start_date,
        end_date: item.end_date,
      }));

      setActivityRoadmap(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลกิจกรรม");
      setActivityRoadmap([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllActivities();
  }, []);

  return { activityRoadmap, loading, error, refetch: fetchAllActivities };
}
