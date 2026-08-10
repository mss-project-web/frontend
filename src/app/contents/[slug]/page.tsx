import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBlogPost, getBlogPreviews, getBlogGroups } from "@/services/blog";
import BlogContent from "./BlogContent";

// Generate Metadata for SEO
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // fetch data
  const blog = await getBlogPost(decodedSlug);

  if (!blog) {
    return {
      title: "ไม่พบเนื้อหา | ชมรมมุสลิม ม.อ.หาดใหญ่",
      description: "ไม่พบเนื้อหาที่คุณค้นหา",
    };
  }

  return {
    title: `${blog.title} | ชมรมมุสลิม ม.อ.หาดใหญ่`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.createdAt,
      authors: ["Admin"],
      images: blog.coverImage ? [blog.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const blog = await getBlogPost(decodedSlug);
  
  // Fetch sidebar data on server
  const recentPostsRes = await getBlogPreviews(undefined, 1, 4);
  const groups = await getBlogGroups();

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ไม่พบเนื้อหาที่คุณค้นหา
        </h1>
        <Link href="/contents">
          <Button>กลับไปหน้าเนื้อหา</Button>
        </Link>
      </div>
    );
  }

  return (
    <BlogContent 
      blog={blog} 
      recentPosts={recentPostsRes?.data || []} 
      groups={groups || []} 
    />
  );
}
