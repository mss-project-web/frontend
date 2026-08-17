"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Home,
  Folder,
  Search,
  Eye,
  ChevronRight,
} from "lucide-react";
import { BlogPost } from "@/services/blog";
import DOMPurify from "isomorphic-dompurify";

const sanitizeHTML = (html: string) => {
  if (!html) return "";
  // การตั้งค่า Default ของ DOMPurify จะอนุญาต HTML ที่ปลอดภัยทั้งหมด (พวกตัวหนา, สี, ตาราง, ลิงก์)
  // แต่เราจะเพิ่มให้รองรับ iframe (เผื่อแอดมินฝัง YouTube) ไปด้วย
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getReadingTime = (blocks?: any[]): number => {
  if (!blocks || blocks.length === 0) return 3;
  const text = blocks
    .map((b) => (typeof b.data === "string" ? b.data : b.data?.text || ""))
    .join(" ");
  // Strip HTML tags to count actual words
  const cleanText = text.replace(/<[^>]*>?/gm, "");
  const words = cleanText.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

// -------------------------------------------------------------
// React Block Renderer
// -------------------------------------------------------------
const RenderBlock = ({ block }: { block: any }) => {
  if (!block || !block.data) return null;

  switch (block.type) {
    case "paragraph":
    case "html":
      const pText =
        typeof block.data === "string" ? block.data : block.data.text || "";
      return <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(pText) }} />;

    case "header":
      const level = block.data.level || 2;
      const text =
        typeof block.data === "string" ? block.data : block.data.text || "";

      return (
        <div>
          {level === 2 ? (
            <h2
              className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-slate-900 tracking-tight"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(text) }}
            />
          ) : level === 3 ? (
            <h3
              className="text-xl md:text-2xl font-bold mt-10 mb-4 text-slate-800 tracking-tight"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(text) }}
            />
          ) : level === 4 ? (
            <h4
              className="text-lg md:text-xl font-bold mt-8 mb-4 text-slate-800"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(text) }}
            />
          ) : (
            <h1
              className="text-3xl font-bold mt-12 mb-6 text-slate-900"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(text) }}
            />
          )}
        </div>
      );

    case "image":
      const url = block.data.file?.url || block.data.url;
      if (!url) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden rounded-3xl bg-slate-100 border border-slate-200">
            <Image
              src={url}
              alt={block.data.caption || "Blog Image"}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>
          {block.data.caption && (
            <figcaption
              className="text-center text-sm text-slate-500 mt-4 font-medium"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(block.data.caption) }}
            />
          )}
        </figure>
      );

    case "list":
      const ListTag = block.data.style === "ordered" ? "ol" : "ul";
      const listClasses =
        block.data.style === "ordered"
          ? "list-decimal marker:text-slate-900 marker:font-bold"
          : "list-disc marker:text-slate-400";
      return (
        <div>
          <ListTag className={`${listClasses} pl-6 mb-8 space-y-3`}>
            {block.data.items?.map((item: string, idx: number) => (
              <li
                key={idx}
                className="text-[17px] text-slate-700 leading-relaxed pl-2"
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(item || "") }}
              />
            ))}
          </ListTag>
        </div>
      );

    case "quote":
      const quoteText =
        typeof block.data === "string" ? block.data : block.data.text || "";
      const quoteCaption = block.data.caption || "";
      return (
        <blockquote className="relative border-l-4 border-slate-900 pl-6 md:pl-8 py-4 my-10 bg-slate-50/50 rounded-r-2xl">
          <p
            className="text-xl md:text-2xl text-slate-800 font-medium leading-snug italic"
            dangerouslySetInnerHTML={{
              __html: quoteText ? sanitizeHTML(`"${quoteText}"`) : "",
            }}
          />
          {quoteCaption && (
            <footer className="text-base text-slate-500 mt-4 font-medium flex items-center gap-2">
              <span className="w-6 h-[1px] bg-slate-300"></span>
              <span dangerouslySetInnerHTML={{ __html: sanitizeHTML(quoteCaption) }} />
            </footer>
          )}
        </blockquote>
      );

    default:
      console.warn(`Unknown block type: ${block.type}`);
      return null;
  }
};

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------
export default function BlogContent({
  blog,
  recentPosts = [],
  groups = [],
}: {
  blog: BlogPost;
  recentPosts: BlogPost[];
  groups: string[];
}) {
  const readingTime = getReadingTime(blog.content);

  return (
    <main className="bg-white min-h-screen pb-24 font-sans selection:bg-slate-200 selection:text-slate-900">
      {/* ─── CINEMATIC HERO ─── */}
      <section className="relative w-full h-[60vh] min-h-[450px] max-h-[700px] bg-slate-900 flex items-end">
        {blog.coverImage && (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            unoptimized
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10 pb-16">
          <div className="max-w-4xl">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href={`/contents?group=${blog.group}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors"
              >
                {blog.group || "บทความ"}
              </Link>
              {blog.tags && blog.tags.length > 0 && (
                <div className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-3">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-white/70 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 drop-shadow-md">
              {blog.title}
            </h1>

            {/* Description Excerpt */}
            {blog.description && (
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-3xl mb-8 line-clamp-2">
                {blog.description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm font-medium border-t border-white/10 pt-6">
              <span suppressHydrationWarning>{formatDate(blog.createdAt)}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime} นาที
              </span>
              {blog.views !== undefined && (
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {blog.views.toLocaleString()} วิว
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT & SIDEBAR ─── */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10 -mt-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Main Article Area */}
          <div className="lg:w-[70%]">
            <article className="bg-white rounded-3xl p-6 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-slate-100">
              {/* HTML Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl">
                {blog.content && blog.content.length > 0 ? (
                  blog.content.map((block: any, idx: number) => (
                    <RenderBlock key={block.id || idx} block={block} />
                  ))
                ) : (
                  <p className="text-slate-500 italic text-center py-20">
                    ไม่มีเนื้อหาในบทความนี้
                  </p>
                )}
              </div>

              {/* Tags & Sharing Footer */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">
                    แท็กที่เกี่ยวข้อง
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags && blog.tags.length > 0 ? (
                      blog.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/contents?search=${tag}`}
                          className="px-4 py-2 bg-slate-50 hover:bg-slate-900 hover:text-white transition-colors text-[13px] text-slate-700 rounded-full font-semibold border border-slate-200 hover:border-slate-900 shadow-sm"
                        >
                          {tag}
                        </Link>
                      ))
                    ) : (
                      <span className="text-sm text-slate-400 italic">
                        ไม่มีแท็ก
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-auto md:text-right border-t border-slate-100 md:border-t-0 pt-6 md:pt-0">
                  <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">
                    แชร์บทความ
                  </h4>
                  <div className="flex items-center md:justify-end gap-3">
                    <button className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 border border-slate-200 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-sm">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 border border-slate-200 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all shadow-sm">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                      }
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[30%] space-y-10 mt-12 lg:mt-24">
            {/* Search Widget */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
              <h3 className="text-lg font-extrabold text-slate-900 mb-5">
                ค้นหาบทความ
              </h3>
              <form action="/contents" method="GET" className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="พิมพ์คำค้นหา..."
                  className="w-full pl-5 pr-12 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors bg-slate-50 text-sm font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Categories Widget */}
            {groups && groups.length > 0 && (
              <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
                <h3 className="text-lg font-extrabold text-slate-900 mb-5">
                  หมวดหมู่
                </h3>
                <ul className="space-y-2">
                  {groups.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/contents?group=${cat}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-medium group transition-colors border border-transparent hover:border-slate-100"
                      >
                        <span className="flex items-center gap-3">
                          <Folder className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                          {cat}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recent Posts Widget */}
            {recentPosts && recentPosts.length > 0 && (
              <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
                <h3 className="text-lg font-extrabold text-slate-900 mb-6">
                  บทความล่าสุด
                </h3>
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <Link
                      href={`/contents/${post.slug || post._id}`}
                      key={post._id}
                      className="flex gap-5 group items-center"
                    >
                      <div className="w-24 h-20 rounded-2xl overflow-hidden relative shrink-0 bg-slate-100 border border-slate-200">
                        {post.coverImage && (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-[15px] font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-1.5">
                          {post.title}
                        </h4>
                        <span
                          className="text-xs text-slate-500 font-medium flex items-center gap-1.5"
                          suppressHydrationWarning
                        >
                          <Clock className="w-3 h-3" />
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
