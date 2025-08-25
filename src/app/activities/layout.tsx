import { Metadata } from "next"

export const metadata: Metadata = {
  title: "กิจกรรม",
  description: "กิจกรรมต่างๆ ของชมรมมุสลิม ม.อ.หาดใหญ่ กิจกรรมศาสนา กิจกรรมเสริมสร้างความสามัคคี และกิจกรรมพัฒนาทักษะ",
  keywords: ["กิจกรรมมุสลิม", "กิจกรรมศาสนา", "กิจกรรมชมรม", "นักศึกษามุสลิม", "PSU Activities"],
  openGraph: {
    title: "กิจกรรมชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "รวมกิจกรรมต่างๆ ของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
  },
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
