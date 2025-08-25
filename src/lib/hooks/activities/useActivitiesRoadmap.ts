import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ActivityRoadmap } from "@/types/activities";
import { API_URL } from "@/config";

export function useAllActivitiesRoadmap() {
  const [activityRoadmap, setActivityRoadmap] = useState<ActivityRoadmap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchAllActivities = async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    setLoading(true);

    try {
      const res = await axios.get(`${API_URL}/activities/roadmap`, {
        signal: abortControllerRef.current.signal,
      });
      
      const data: ActivityRoadmap[] = Array.isArray(res.data.data?.data)
        ? res.data.data.data
        : [];

      setActivityRoadmap(data);
      setError(null);
    } catch (err: any) {
      if (err.name !== 'CanceledError') {
        setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลกิจกรรม");
        setActivityRoadmap([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllActivities();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { activityRoadmap, loading, error, refetch: fetchAllActivities };
}