import { Metadata } from "next"

export const metadata: Metadata = {
  title: "กิจกรรม",
  description: "กิจกรรมต่างๆ ของชมรมมุสลิม ม.อ.หาดใหญ่ ⭐ กิจกรรมศาสนา ⭐ กิจกรรมเสริมสร้างความสามัคคี ⭐ กิจกรรมพัฒนาทักษะ ⭐ กิจกรรมชุมชน ⭐ กิจกรรมอิสลาม PSU หาดใหญ่",
  keywords: [
    "กิจกรรมมุสลิม", "กิจกรรมศาสนา", "กิจกรรมชมรม", "นักศึกษามุสลิม", 
    "PSU Activities", "กิจกรรม", "Activities", "รอมฎอน", "อีดิ้ลฟิตร์",
    "อิฟตาร", "กิจกรรมอิสลาม", "Islamic Activities", "Muslim Activities",
    "งานวันมุสลิม", "กิจกรรมศาสนกิจ", "หาดใหญ่"
  ],
  openGraph: {
    title: "กิจกรรมชมรมมุสลิม ม.อ.หาดใหญ่ - กิจกรรมศาสนาและชุมชน",
    description: "รวมกิจกรรมต่างๆ ของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ กิจกรรมศาสนาอิสลาม งานเทศกาล และกิจกรรมพัฒนานักศึกษา",
    type: "website",
    url: "https://msspsuhatyai.org/activities"
  },
  twitter: {
    card: "summary_large_image",
    title: "กิจกรรมชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "กิจกรรมศาสนาอิสลาม กิจกรรมชุมชน และกิจกรรมพัฒนานักศึกษามุสลิม"
  }
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
