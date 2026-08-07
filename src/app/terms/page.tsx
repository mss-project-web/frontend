import { Metadata } from "next"
import { CONTACT } from "@/lib/constants"
import { ShieldAlert, CheckCircle, AlertTriangle, Scale, BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: "เงื่อนไขการให้บริการ (Terms of Service)",
    description: "ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ ชมรมมุสลิม ม.อ.หาดใหญ่",
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 font-sans pb-20">
            {/* Header / Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.svg')]"></div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 ring-1 ring-white/20">
                        <BookOpen className="w-8 h-8 text-blue-200" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                        เงื่อนไขการให้บริการ
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        ข้อกำหนดและเงื่อนไขการใช้งาน (Terms of Service) สำหรับเว็บไซต์
                        ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12 space-y-10">

                        {/* 1. Introduction */}
                        <section className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">1. การยอมรับเงื่อนไข</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed pl-14">
                                การเข้าถึงและใช้งานเว็บไซต์ของ ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ (MSS PSU Hatyai)
                                ถือว่าท่านได้อ่าน ทำความเข้าใจ และยอมรับข้อผูกพันตามเงื่อนไขการให้บริการนี้ทุกประการ
                                หากท่านไม่เห็นด้วยกับข้อกำหนดเหล่านี้ กรุณางดเว้นการใช้งานเว็บไซต์ของเรา
                            </p>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 2. User Conduct */}
                        <section className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">2. การใช้งานเว็บไซต์</h2>
                            </div>
                            <div className="pl-14">
                                <p className="text-gray-600 mb-4">ผู้ใช้งานตกลงที่จะใช้เว็บไซต์นี้เพื่อวัตถุประสงค์ที่ชอบด้วยกฎหมายเท่านั้น และจะไม่กระทำการดังต่อไปนี้:</p>
                                <ul className="space-y-3">
                                    {[
                                        "ละเมิดสิทธิส่วนบุคคล หรือสิทธิในทรัพย์สินทางปัญญาของผู้อื่น",
                                        "นำเข้า เผยแพร่ หรือส่งต่อเนื้อหาที่ผิดกฎหมาย ลามกอนาจาร หรือสร้างความแตกแยก",
                                        "พยายามเจาะระบบ (Hack) หรือกระทำการใดๆ ที่อาจก่อให้เกิดความเสียหายแก่ระบบเซิร์ฟเวอร์และเครือข่าย",
                                        "ใช้เว็บไซต์เพื่อวัตถุประสงค์ในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600">
                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2.5 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 3. Intellectual Property */}
                        <section className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:bg-amber-100 transition-colors">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">3. ทรัพย์สินทางปัญญา</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed pl-14">
                                เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงแต่ไม่จำกัดเพียง ข้อความ, รูปภาพ, กราฟิก, โลโก้, วิดีโอ และโค้ด
                                ถือเป็นทรัพย์สินทางปัญญาของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ หรือผู้ให้อนุญาตที่เกี่ยวข้อง
                                ห้ามมิให้ผู้ใดคัดลอก ดัดแปลง หรือนำไปเผยแพร่โดยไม่ได้รับอนุญาต
                            </p>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 4. Limitation of Liability */}
                        <section className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-rose-50 rounded-lg text-rose-600 group-hover:bg-rose-100 transition-colors">
                                    <Scale className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">4. การจำกัดความรับผิด</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed pl-14">
                                เว็บไซต์นี้จัดทำขึ้นแบบ "ตามสภาพที่ปรากฏ" (As Is) และ "ตามที่มีอยู่" (As Available)
                                เราไม่ขอรับประกันว่าเว็บไซต์จะทำงานได้อย่างต่อเนื่อง ไร้ข้อผิดพลาด หรือปราศจากไวรัส
                                และเราจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่อาจเกิดขึ้นจากการใช้งาน หรือความไม่สามารถใช้งานเว็บไซต์นี้ได้
                            </p>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 5. Modification of Terms */}
                        <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">5. การเปลี่ยนแปลงข้อกำหนด</h2>
                            <p className="text-gray-600">
                                เราขอสงวนสิทธิ์ในการแก้ไข หรือเปลี่ยนแปลงเงื่อนไขการให้บริการนี้เมื่อใดก็ได้ โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
                                การที่ท่านใช้งานเว็บไซต์ต่อไปหลังจากการเปลี่ยนแปลง จะถือว่าท่านยอมรับข้อกำหนดที่ถูกปรับปรุงแล้ว
                            </p>
                        </section>

                        <div className="text-center pt-4">
                            <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
                                ปรับปรุงล่าสุด: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
