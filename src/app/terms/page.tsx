import { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
    title: "เงื่อนไขการให้บริการ (Terms of Service) | ชมรมมุสลิม ม.อ.หาดใหญ่",
    description: "ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ ชมรมมุสลิม ม.อ.หาดใหญ่",
};

export default function TermsPage() {
    return <TermsContent />;
}
