import { Metadata } from "next"

export const metadata: Metadata = {
    title: "ติดต่อเรา",
    description: "ติดต่อเรา มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    keywords: ["ติดต่อเรา", "ติดต่อ", "ติดต่อเรา", "ติดต่อเรา", "ติดต่อเรา"],
    openGraph: {
        title: "ติดต่อเรา ม.อ.หาดใหญ่",
        description: "ติดต่อเราและสถานที่ประกอบศาสนกิจใน มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
