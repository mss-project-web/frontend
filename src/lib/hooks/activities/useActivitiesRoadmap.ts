import { useState, useEffect } from "react";
import axios from "axios";
import { ActivityRoadmap } from "@/types/activities";
import { API_URL } from "@/config";

export function useAllActivitiesRoadmap() {
  const [activityRoadmap, setActivityRoadmap] = useState<ActivityRoadmap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllActivities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/activities/roadmap`);
      
      const data: ActivityRoadmap[] = Array.isArray(res.data.data?.data)
        ? res.data.data.data
        : [];

      setActivityRoadmap(data);
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