import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/config";
import { NewsItem } from "@/types/news";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

// Dedicated axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

export const useNewsAll = () => {
  // Initialize month/year eagerly to avoid a second fetch triggered by state updates
  const now = new Date();
  const initMonth = (now.getMonth() + 1).toString().padStart(2, "0");
  const initYear  = now.getFullYear().toString();

  const [allNews, setAllNews]           = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage]   = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string>(initMonth);
  const [selectedYear, setSelectedYear]   = useState<string>(initYear);
  const [loading, setLoading]           = useState<boolean>(true);
  const [availableYears, setAvailableYears] = useState<number[]>(() => {
    const yr = now.getFullYear();
    return Array.from({ length: 5 }, (_, i) => yr - 2 + i);
  });

  // AbortController ref — cancel in-flight request on filter change
  const abortRef = useRef<AbortController | null>(null);

  // Single fetch effect — runs whenever month/year changes (including initial mount)
  useEffect(() => {
    // Cancel previous in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    const fetchNews = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (selectedMonth) params.month = selectedMonth;
        if (selectedYear) params.year = selectedYear;

        const res = await apiClient.get(`/news`, { params, signal });
        if (!signal.aborted) {
          setAllNews(res.data.data.data ?? []);
          setCurrentPage(1);
        }
      } catch (err: any) {
        if (!axios.isCancel(err) && err?.name !== "CanceledError") {
          setAllNews([]);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchNews();
    return () => abortRef.current?.abort();
  }, [selectedMonth, selectedYear]);

  const totalPages = Math.ceil(allNews.length / ITEMS_PER_PAGE);

  const paginatedNews = allNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value === "all" ? "" : value);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  return {
    loading,
    paginatedNews,
    totalPages,
    currentPage,
    goToPage,
    selectedMonth,
    handleMonthChange,
    selectedYear,
    handleYearChange,
    availableYears,
  };
};