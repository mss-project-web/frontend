import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import { ActivityThisMonthResult } from "@/types/activities";

export function useActivitiesThisMonth() {
  const [activities, setActivities] = useState<ActivityThisMonthResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_URL}/activities/this-month`);

      const rawData = Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.data?.data)
        ? res.data.data.data
        : [];

      setActivities(rawData);
    } catch (err: any) {
      setError(err.message || "ไม่สามารถโหลดกิจกรรมประจำเดือนนี้ได้");
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
