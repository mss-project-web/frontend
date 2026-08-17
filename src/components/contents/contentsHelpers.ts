// Shared category color map and helpers for contents components

export const catColorMap: Record<string, { bg: string; text: string }> = {
  "ความรู้ทั่วไป": { bg: "bg-blue-600",    text: "text-white" },
  "การเรียน":      { bg: "bg-amber-500",   text: "text-white" },
  "สุขภาพจิต":    { bg: "bg-emerald-600", text: "text-white" },
  "ไลฟ์สไตล์":   { bg: "bg-violet-600",  text: "text-white" },
  "เทคโนโลยี":   { bg: "bg-sky-500",     text: "text-white" },
  "ศาสนา":        { bg: "bg-rose-600",    text: "text-white" },
};

export const getCatColor = (g?: string) =>
  (g && catColorMap[g]) || { bg: "bg-slate-800", text: "text-white" };

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });

export const getReadingTime = (desc?: string) =>
  Math.max(1, Math.ceil((desc?.split(" ").length ?? 0) / 200)) || 3;
