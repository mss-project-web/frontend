import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
    title: "นโยบายความเป็นส่วนตัว (Privacy Policy) | ชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "นโยบายความเป็นส่วนตัวของเว็บไซต์ ชมรมมุสลิม ม.อ.หาดใหญ่",
};

export default function PrivacyPage() {
    return <PrivacyContent />;
}
