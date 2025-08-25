import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { News } from "@/types/news";
import { API_URL } from "@/config";

export function useNews() {
      const [news, setNews] = useState<News[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const abortControllerRef = useRef<AbortController | null>(null);

      const fetchNews = async () => {
            // Cancel previous request if exists
            if (abortControllerRef.current) {
                  abortControllerRef.current.abort();
            }

            // Create new abort controller
            abortControllerRef.current = new AbortController();
            setLoading(true);

            try {
                  const res = await axios.get(`${API_URL}/news/latest`, {
                        signal: abortControllerRef.current.signal,
                  });
                  const NewsFromApi: News[] = res.data.data.data;

                  if (!Array.isArray(NewsFromApi)) {
                        throw new Error("API response data is not an array");
                  }

                  const formattedNews: News[] = NewsFromApi.map((news) => ({
                        _id: news._id,
                        name: news.name,
                        date: news.date,
                        images: news.images,
                        link: news.link,
                        description: news.description,
                        createdAt: news.createdAt,
                        updatedAt: news.updatedAt,
                  }));

                  setNews(formattedNews);
            } catch (err: any) {
                  if (err.name !== 'CanceledError') {
                        setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลข่าว");
                  }
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchNews();

            // Cleanup function
            return () => {
                  if (abortControllerRef.current) {
                        abortControllerRef.current.abort();
                  }
            };
      }, []);

      return { news, loading, error, refetch: fetchNews };
}
