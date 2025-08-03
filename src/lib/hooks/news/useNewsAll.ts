import { useState, useEffect } from "react";
import axios from "axios";
import { NewsAll } from "@/types/news";
import { API_URL } from "@/config";

export function useNewsAll() {
      const [news, setNews] = useState<NewsAll[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      const fetchNews = async () => {
            setLoading(true);
            try {
                  const res = await axios.get(`${API_URL}/news`);

                  const newsFromApi = Array.isArray(res.data.data)
                        ? res.data.data
                        : Array.isArray(res.data.data?.data)
                              ? res.data.data.data
                              : [];

                  const formattedNews: NewsAll[] = newsFromApi.map((item: NewsAll) => ({
                        _id: item._id,
                        name: item.name,
                        date: item.date,
                        images: item.images,
                        link: item.link,
                        description: item.description,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                  }));

                  setNews(formattedNews);
                  setError(null);
            } catch (err: any) {
                  setError(err.message || "เกิดข้อผิดพลาดในการโหลดข่าว");
                  setNews([]);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchNews();
      }, []);

      return { news, loading, error, refetch: fetchNews };
}
