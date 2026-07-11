import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อสอบถามชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ ⭐ ข้อมูลติดต่อ ⭐ ช่องทางการสื่อสาร ⭐ คำถามที่พบบ่อย ⭐ แบบฟอร์มติดต่อ",
  keywords: [
    "ติดต่อเรา", "Contact Us", "ติดต่อชมรมมุสลิม", "สอบถาม", 
    "ช่องทางติดต่อ", "Contact Information", "ข้อมูลติดต่อ",
    "คำถาม", "FAQ", "ติดต่อ ม.อ.หาดใหญ่", "PSU Contact",
    "Facebook", "Instagram", "Social Media", "หาดใหญ่"
  ],
  openGraph: {
    title: "ติดต่อเรา - ชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "ติดต่อสอบถามและสื่อสารกับชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ เรายินดีรับฟังความคิดเห็นจากทุกท่าน",
    type: "website",
    url: "https://msspsuhatyai.org/contact"
  },
  twitter: {
    card: "summary_large_image",
    title: "ติดต่อเรา - ชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "ช่องทางการติดต่อและสอบถามข้อมูลจากชมรมมุสลิม PSU หาดใหญ่"
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
