import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import { ActivityThisMonthResult } from "@/types/activities";

export function useActivitiesThisMonth() {
  const [activities, setActivities] = useState<ActivityThisMonthResult[]>([]);
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
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/activities/this-month`, {
        signal: abortControllerRef.current.signal,
      });

      const rawData = Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.data?.data)
        ? res.data.data.data
        : [];

      setActivities(rawData);
    } catch (err: any) {
      if (err.name !== 'CanceledError') {
        setError(err.message || "ไม่สามารถโหลดกิจกรรมประจำเดือนนี้ได้");
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
