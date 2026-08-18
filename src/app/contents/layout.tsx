import { Metadata } from "next";

export const metadata: Metadata = {
  title: "เนื้อหาวิชาการ",
  description:
    "รวมบทความและเนื้อหาวิชาการที่น่าสนใจจากชมรมมุสลิม ม.อ.หาดใหญ่ (MSS PSU Hatyai) ครอบคลุมเรื่องราวทางศาสนา การใช้ชีวิต และความรู้ทั่วไปสำหรับนักศึกษา",
  keywords: [
    "เนื้อหาวิชาการ",
    "บทความมุสลิม",
    "ความรู้อิสลาม",
    "บทความศาสนา",
    "บทความนักศึกษา",
    "การใช้ชีวิตในมหาลัย",
    "ชมรมมุสลิม ม.อ.หาดใหญ่",
    "MSS PSU Hatyai",
    "Islamic Articles",
    "Muslim Student",
  ],
  openGraph: {
    title: "บทความและเนื้อหาวิชาการ - ชมรมมุสลิม ม.อ.หาดใหญ่",
    description:
      "อ่านบทความและเนื้อหาวิชาการที่ให้ความรู้จากชมรมมุสลิม ม.อ.หาดใหญ่",
    type: "website",
    url: "https://msspsuhatyai.org/contents",
  },
  twitter: {
    card: "summary_large_image",
    title: "เนื้อหาวิชาการ - ชมรมมุสลิม ม.อ.หาดใหญ่",
    description:
      "รวมบทความและเนื้อหาวิชาการที่น่าสนใจจากชมรมมุสลิม ม.อ.หาดใหญ่",
  },
};

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
