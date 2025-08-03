import { useState, useEffect } from "react";
import axios from "axios";
import { ActivityById } from "@/types/activities";
import { API_URL } from "@/config";

export function useActivityById(id: string | null) {
  const [activity, setActivity] = useState<ActivityById | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivityById = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/activities/${id}`);
      const data = res.data.data;

      const formattedActivity: ActivityById = {
        _id: data._id,
        name_th: data.name_th,
        name_eng: data.name_eng,
        location: data.location,
        participants: data.participants,
        duration: data.duration,
        description: data.description,
        images: Array.isArray(data.images) ? data.images : [data.images],
        objectives: Array.isArray(data.objectives) ? data.objectives : [data.objectives].filter(Boolean), // แก้ไขตรงนี้
        goals: Array.isArray(data.goals) ? data.goals : [data.goals],
        start_date: data.start_date,
        end_date: data.end_date,
        feedbacks: Array.isArray(data.feedbacks) ? data.feedbacks : [data.feedbacks],
        favorite: data.favorite,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      setActivity(formattedActivity);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลกิจกรรม");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityById();
  }, [id]);

  return { activity, loading, error, refetch: fetchActivityById };
}
