import { Metadata } from "next"
import { CONTACT } from "@/lib/constants"
import { Shield, Lock, Eye, FileText, Mail, Server, MousePointer } from "lucide-react"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 font-sans pb-20">
            {/* Header / Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.svg')]"></div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 ring-1 ring-white/20">
                        <Shield className="w-8 h-8 text-blue-200" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                        นโยบายความเป็นส่วนตัว
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        เราให้ความสำคัญกับข้อมูลส่วนบุคคลของคุณ และมุ่งมั่นที่จะคุ้มครองข้อมูลของคุณตามมาตรฐาน PDPA
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
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">1. บทนำ</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed pl-14">
                                ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ (ต่อไปนี้จะเรียกว่า "เรา") ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของท่าน เราจึงได้จัดทำนโยบายความเป็นส่วนตัวฉบับนี้ขึ้น เพื่อชี้แจงให้ท่านทราบถึงรายละเอียดเกี่ยวกับการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่าน ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
                            </p>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 2. Collected Data */}
                        <section className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                    <Server className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">2. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</h2>
                            </div>
                            <div className="pl-14">
                                <p className="text-gray-600 mb-4">เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน ดังนี้:</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                        <h3 className="font-semibold text-gray-900 mb-2">ข้อมูลระบุตัวตน</h3>
                                        <p className="text-sm text-gray-500">เช่น ชื่อ, นามสกุล (กรณีท่านติดต่อเรา)</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                        <h3 className="font-semibold text-gray-900 mb-2">ข้อมูลการติดต่อ</h3>
                                        <p className="text-sm text-gray-500">เช่น อีเมล, หมายเลขโทรศัพท์</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
                                        <h3 className="font-semibold text-gray-900 mb-2">ข้อมูลทางเทคนิค</h3>
                                        <p className="text-sm text-gray-500">เช่น IP Address, Cookie ID, ประวัติการใช้งานเว็บไซต์ (ผ่าน Google Analytics)</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 3. Purpose */}
                        <section className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-100 transition-colors">
                                    <Eye className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">3. วัตถุประสงค์การเก็บรวบรวมข้อมูล</h2>
                            </div>
                            <ul className="space-y-3 pl-14">
                                {[
                                    "วิเคราะห์และปรับปรุงประสิทธิภาพของเว็บไซต์และบริการของเรา",
                                    "ติดต่อสื่อสารและตอบกลับข้อซักถามของท่าน",
                                    "ปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้อง"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-600">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 4. Cookies */}
                        <section className="group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-50 rounded-lg text-orange-600 group-hover:bg-orange-100 transition-colors">
                                    <MousePointer className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">4. คุกกี้ (Cookies)</h2>
                            </div>
                            <div className="pl-14 text-gray-600">
                                <p className="mb-6">
                                    เว็บไซต์ของเรามีการใช้คุกกี้เพื่อเพิ่มประสบการณ์การใช้งานของท่าน ท่านสามารถเลือกที่จะยอมรับหรือปฏิเสธคุกกี้บางประเภทได้ผ่านการตั้งค่าคุกกี้บนเว็บไซต์ของเรา
                                </p>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                                        <div className="w-2 h-full bg-orange-400 rounded-full shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">คุกกี้ที่จำเป็น (Strictly Necessary)</h4>
                                            <p className="text-sm text-gray-500 mt-1">จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                        <div className="w-2 h-full bg-blue-400 rounded-full shrink-0"></div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">คุกกี้เพื่อการวิเคราะห์ (Analytics)</h4>
                                            <p className="text-sm text-gray-500 mt-1">ช่วยให้เราเข้าใจพฤติกรรมการใช้งานเว็บไซต์ผ่าน Google Analytics</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 5. Disclosure & 6. Rights */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">5. การเปิดเผยข้อมูล</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed ml-12">
                                    เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านต่อบุคคลภายนอก เว้นแต่จะได้รับความยินยอมจากท่าน หรือเป็นการปฏิบัติตามคำสั่งของเจ้าหน้าที่รัฐหรือตามที่กฎหมายกำหนด
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">6. สิทธิของท่าน</h2>
                                </div>
                                <ul className="ml-12 grid grid-cols-2 gap-2 text-sm text-gray-600">
                                    <li className="list-disc list-inside">ขอเข้าถึงข้อมูล</li>
                                    <li className="list-disc list-inside">ขอแก้ไขข้อมูล</li>
                                    <li className="list-disc list-inside">ขอลบข้อมูล</li>
                                    <li className="list-disc list-inside">ขอระงับการใช้</li>
                                    <li className="list-disc list-inside">ขอโอนย้าย</li>
                                    <li className="list-disc list-inside">คัดค้าน</li>
                                </ul>
                            </section>
                        </div>

                        <hr className="border-gray-100" />

                        {/* 7. Contact */}
                        <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">7. ติดต่อเรา</h2>
                            </div>
                            <div className="pl-14">
                                <p className="text-gray-600 mb-4">หากท่านมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ สามารถติดต่อเราได้ที่:</p>
                                <div className="space-y-2 text-gray-700 font-medium">
                                    <p className="text-lg text-blue-900">ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่</p>
                                    <p>15 ถนนกาญจนวณิชย์ ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา 90110</p>
                                    <p className="flex items-center gap-2 pt-2">
                                        <span className="text-gray-400 font-normal">อีเมล:</span>
                                        {CONTACT.email}
                                    </p>
                                </div>
                            </div>
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
