import { Metadata } from "next"

export const metadata: Metadata = {
    title: "เนื้อหาวิชาการ",
    description: "เนื้อหาวิชาการ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    keywords: ["เนื้อหาวิชาการ", "เนื้อหาวิชาการ", "เนื้อหาวิชาการ", "เนื้อหาวิชาการ", "เนื้อหาวิชาการ"],
    openGraph: {
        title: "เนื้อหาวิชาการ ม.อ.หาดใหญ่",
        description: "เนื้อหาวิชาการและสถานที่ประกอบศาสนกิจใน มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    },
};

export default function ContentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
