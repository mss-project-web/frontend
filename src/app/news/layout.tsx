import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ข่าวสาร",
  description: "ข่าวสารและประชาสัมพันธ์จากชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ ⭐ ข่าวกิจกรรม ⭐ ประกาศสำคัญ ⭐ อัพเดทล่าสุด ⭐ ข่าวชุมชนมุสลิม",
  keywords: [
    "ข่าวสาร", "ข่าวชมรมมุสลิม", "ประชาสัมพันธ์", "ข่าวกิจกรรม", 
    "ข่าว ม.อ.หาดใหญ่", "News", "ข่าวมุสลิม", "ข่าวศาสนา",
    "ประกาศ", "Announcement", "ข่าวสารอิสลาม", "Islamic News",
    "ข่าวนักศึกษา", "ข่าวมหาวิทยาลัย", "PSU News", "หาดใหญ่"
  ],
  openGraph: {
    title: "ข่าวสารชมรมมุสลิม ม.อ.หาดใหญ่ - ข่าวและประชาสัมพันธ์",
    description: "ติดตามข่าวสารและประชาสัมพันธ์จากชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ ข่าวกิจกรรม ประกาศสำคัญ และอัพเดทล่าสุด",
    type: "website",
    url: "https://msspsuhatyai.org/news"
  },
  twitter: {
    card: "summary_large_image",
    title: "ข่าวสารชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "ข่าวกิจกรรม ประกาศสำคัญ และอัพเดทจากชุมชนมุสลิม PSU หาดใหญ่"
  }
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
