import { Metadata } from "next"

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "ประวัติความเป็นมา วิสัยทัศน์ พันธกิจ และเป้าหมายของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
  keywords: ["ประวัติชมรมมุสลิม", "วิสัยทัศน์", "พันธกิจ", "เป้าหมาย", "ม.อ.หาดใหญ่", "นักศึกษามุสลิม"],
  openGraph: {
    title: "เกี่ยวกับชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "ประวัติความเป็นมา วิสัยทัศน์ และพันธกิจของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    images: ["/LOGO/about/LOGO-MSS.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
