import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getBlogGroups, getBlogPreviews } from "@/services/blog";
import type { BlogPost } from "@/types/blog";

const ITEMS_PER_PAGE = 12;

export const useContents = () => {
  const [groups, setGroups]                   = useState<string[]>([]);
  const [activeTab, setActiveTab]             = useState("all");
  const [blogs, setBlogs]                     = useState<BlogPost[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [page, setPage]                       = useState(1);
  const [totalPages, setTotalPages]           = useState(1);
  const [totalItems, setTotalItems]           = useState(0);
  const [searchQuery, setSearchQuery]         = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // AbortController ref — cancel in-flight request when deps change
  const abortRef = useRef<AbortController | null>(null);

  // Debounce search input (400ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Fetch groups once on mount
  useEffect(() => {
    getBlogGroups().then((d) => setGroups(d || []));
  }, []);

  // Fetch blogs — cancel previous request on every dependency change
  useEffect(() => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    const load = async () => {
      setLoading(true);
      try {
        const res = await getBlogPreviews(
          activeTab === "all" ? undefined : activeTab,
          page,
          ITEMS_PER_PAGE,
          debouncedSearch || undefined,
          { signal }
        );
        // If request was aborted, res will be null — don't update state
        if (res) {
          setBlogs(res.data);
          setTotalPages(res.totalPages);
          setTotalItems(res.total);
        } else if (!signal.aborted) {
          setBlogs([]);
          setTotalPages(0);
          setTotalItems(0);
        }
      } catch (err: any) {
        if (!axios.isCancel(err) && err?.name !== "CanceledError") {
          setBlogs([]);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    load();

    // Cleanup: abort on unmount or next render
    return () => abortRef.current?.abort();
  }, [activeTab, page, debouncedSearch]);

  // Derived: top 5 by views
  const trending = [...blogs]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 5);

  // Derived: smart page numbers with ellipsis
  const pageNums = (() => {
    const nums: (number | "ellipsis")[] = [];
    Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(
        (p) =>
          totalPages <= 7 ||
          Math.abs(page - p) <= 1 ||
          p === 1 ||
          p === totalPages
      )
      .forEach((p, idx, arr) => {
        if (idx > 0 && p - arr[idx - 1]! > 1) nums.push("ellipsis");
        nums.push(p);
      });
    return nums;
  })();

  const changeTab = (v: string) => {
    setActiveTab(v);
    setPage(1);
    const el = document.getElementById("contents-grid");
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    const el = document.getElementById("contents-grid");
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const clearSearch = () => setSearchQuery("");

  return {
    // state
    groups,
    activeTab,
    blogs,
    loading,
    page,
    totalPages,
    totalItems,
    searchQuery,
    debouncedSearch,
    // derived
    trending,
    pageNums,
    // handlers
    setSearchQuery,
    changeTab,
    goToPage,
    clearSearch,
  };
};
