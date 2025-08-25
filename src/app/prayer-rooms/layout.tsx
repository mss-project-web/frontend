import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ห้องละหมาด",
  description: "ห้องละหมาดใน มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ สถานที่สำหรับประกอบศาสนกิจ เวลาละหมาด และแนวทางการใช้",
  keywords: ["ห้องละหมาด", "Prayer Room", "เวลาละหมาด", "สถานที่ประกอบศาสนกิจ", "มุสลิม ม.อ.หาดใหญ่"],
  openGraph: {
    title: "ห้องละหมาด ม.อ.หาดใหญ่",
    description: "ห้องละหมาดและสถานที่ประกอบศาสนกิจใน มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
  },
};

export default function PrayerRoomsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
