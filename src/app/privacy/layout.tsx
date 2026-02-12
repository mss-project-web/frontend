import { Metadata } from "next"

export const metadata: Metadata = {
    title: "นโยบายความเป็นส่วนตัว",
    description: "นโยบายความเป็นส่วนตัว มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    keywords: ["นโยบายความเป็นส่วนตัว", "Privacy Policy", "นโยบายความเป็นส่วนตัว", "นโยบายความเป็นส่วนตัว", "นโยบายความเป็นส่วนตัว"],
    openGraph: {
        title: "นโยบายความเป็นส่วนตัว ม.อ.หาดใหญ่",
        description: "นโยบายความเป็นส่วนตัวและสถานที่ประกอบศาสนกิจใน มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
