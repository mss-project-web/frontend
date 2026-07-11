import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ช่องทางการติดต่อและลิงก์ทั้งหมด",
  description: "รวมลิงก์โซเชียลมีเดีย เว็บไซต์ และช่องทางการติดต่อทั้งหมดของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ (MSS PSU Hatyai)",
  openGraph: {
    title: "ช่องทางการติดต่อและลิงก์ทั้งหมด | ชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "รวมลิงก์โซเชียลมีเดีย เว็บไซต์ และช่องทางการติดต่อทั้งหมดของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    url: "https://msspsuhatyai.org/links",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ช่องทางการติดต่อและลิงก์ทั้งหมด | ชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "รวมลิงก์โซเชียลมีเดีย เว็บไซต์ และช่องทางการติดต่อทั้งหมดของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
  },
  alternates: {
    canonical: "https://msspsuhatyai.org/links",
  }
}

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
