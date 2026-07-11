import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ห้องละหมาด",
  description: "ห้องละหมาดใน มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ ⭐ สถานที่สำหรับประกอบศาสนกิจ ⭐ เวลาละหมาด ⭐ แนวทางการใช้ ⭐ แผนที่ห้องละหมาด ⭐ ชุมชนมุสลิม PSU",
  keywords: [
    "ห้องละหมาด", "Prayer Room", "เวลาละหมาด", "สถานที่ประกอบศาสนกิจ", 
    "มุสลิม ม.อ.หาดใหญ่", "Prayer Time", "มัสยิด", "Mosque", "Islamic Prayer",
    "ห้องละหมาด PSU", "ห้องละหมาดมหาวิทยาลัย", "ศาลาการประกอบพิธี",
    "Qibla", "กิบลัต", "วุฎู", "Wudu", "สงขลา", "หาดใหญ่"
  ],
  openGraph: {
    title: "ห้องละหมาด ม.อ.หาดใหญ่ - สถานที่ประกอบศาสนกิจ",
    description: "ห้องละหมาดและสถานที่ประกอบศาสนกิจใน มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ พร้อมข้อมูลเวลาละหมาดและแนวทางการใช้",
    type: "website",
    url: "https://msspsuhatyai.org/prayer-rooms"
  },
  twitter: {
    card: "summary_large_image",
    title: "ห้องละหมาด ม.อ.หาดใหญ่",
    description: "สถานที่ประกอบศาสนกิจสำหรับชุมชนมุสลิมใน มหาวิทยาลัยสงขลานครินทร์"
  }
};

export default function PrayerRoomsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
