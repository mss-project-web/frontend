import { useState, useEffect } from "react";
import axios from "axios";
import { News } from "@/types/news";
import { API_URL } from "@/config";

export function useNews() {
      const [news, setNews] = useState<News[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const fetchNews = async () => {
            setLoading(true);
            try {
                  const res = await axios.get(`${API_URL}/news/latest`);
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
                  console.log("News fetched successfully:", formattedNews);
            } catch (err: any) {
                  setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลข่าว");
                  console.error("Error fetching news:", err);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchNews();
      }, []);

      return { news, loading, error, refetch: fetchNews };
}
