import { Metadata } from "next"

export const metadata: Metadata = {
  title: "เนื้อหา - เร็วๆนี้",
  description: "เนื้อหาและข้อมูลเพิ่มเติมจากชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ กำลังพัฒนาและเตรียมเนื้อหาสำหรับคุณ อินชาอัลลอฮฺ",
  keywords: [
    "เนื้อหา", "Contents", "ข้อมูลเพิ่มเติม", "กำลังพัฒนา", 
    "เร็วๆนี้", "Coming Soon", "อินชาอัลลอฮฺ", "Insha Allah",
    "ชมรมมุสลิม", "ม.อ.หาดใหญ่", "PSU Hatyai", "พัฒนาเว็บไซต์"
  ],
  openGraph: {
    title: "เนื้อหาเพิ่มเติม - ชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "เนื้อหาและข้อมูลเพิ่มเติมกำลังพัฒนา อินชาอัลลอฮฺ",
    type: "website",
    url: "https://msspsuhatyai.org/contents"
  },
  twitter: {
    card: "summary",
    title: "เนื้อหาเพิ่มเติม - ชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "กำลังพัฒนาเนื้อหาสำหรับคุณ อินชาอัลลอฮฺ"
  }
};

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
