import { Metadata } from "next"

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "ประวัติความเป็นมา วิสัยทัศน์ พันธกิจ และเป้าหมายของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ - หวังดีดี จากบ้านหลังเดิม ⭐ กิจกรรมศาสนาอิสลาม ⭐ ชุมชนนักศึกษามุสลิม",
  keywords: [
    "ประวัติชมรมมุสลิม", "วิสัยทัศน์", "พันธกิจ", "เป้าหมาย", "ม.อ.หาดใหญ่", 
    "นักศึกษามุสลิม", "เกี่ยวกับเรา", "ประวัติศาสตร์", "ชมรมอิสลาม",
    "มหาวิทยาลัยสงขลานครินทร์", "PSU Hatyai Muslim", "เกี่ยวกับ",
    "หวังดีดี จากบ้านหลังเดิม", "บ้านหลังเดิม", "About Us"
  ],
  openGraph: {
    title: "เกี่ยวกับชมรมมุสลิม ม.อ.หาดใหญ่ - หวังดีดี จากบ้านหลังเดิม",
    description: "ประวัติความเป็นมา วิสัยทัศน์ และพันธกิจของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ กิจกรรมศาสนาอิสลามและชุมชนนักศึกษามุสลิม",
    images: ["/LOGO/about/LOGO-MSS.jpg"],
    type: "website",
    url: "https://msspsuhatyai.org/about"
  },
  twitter: {
    card: "summary_large_image",
    title: "เกี่ยวกับชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "หวังดีดี จากบ้านหลังเดิม - ประวัติและพันธกิจชมรมมุสลิม PSU หาดใหญ่",
    images: ["/LOGO/about/LOGO-MSS.jpg"]
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
