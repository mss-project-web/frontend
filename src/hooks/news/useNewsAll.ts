import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import { NewsItem } from "@/types/news";

const ITEMS_PER_PAGE = 6;

export const useNewsAll = () => {
      const [allNews, setAllNews] = useState<NewsItem[]>([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [selectedMonth, setSelectedMonth] = useState<string>("");
      const [selectedYear, setSelectedYear] = useState<string>("");
      const [loading, setLoading] = useState<boolean>(true);
      const [availableYears, setAvailableYears] = useState<number[]>([]);

      const fetchNews = async (month?: string, year?: string) => {
            setLoading(true);
            try {
                  const queryMonth = month ? `month=${month}` : "";
                  const queryYear = year ? `&year=${year}` : "";
                  const endpoint = `/news?${queryMonth}${queryYear}`;

                  const res = await axios.get(`${API_URL}${endpoint}`);
                  setAllNews(res.data.data.data);
                  setCurrentPage(1);
            } catch (err) {
                  setAllNews([]);
            } finally {
                  setLoading(false);
            }
      };

      const fetchAvailableYears = () => {
            const currentYear = new Date().getFullYear();
            const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
            setAvailableYears(years);
      };

      useEffect(() => {
            fetchAvailableYears();
            const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
            const currentYear = new Date().getFullYear().toString();
            setSelectedMonth(currentMonth);
            setSelectedYear(currentYear);
            fetchNews(currentMonth, currentYear);
      }, []);

      useEffect(() => {
            fetchNews(selectedMonth, selectedYear);
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