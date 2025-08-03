import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactUsSection() {
      return (
            <section className="relative z-10 mx-auto max-w-screen-xl px-4 py-10 md:py-10">
                  <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                              <div className="space-y-5">
                                    <div>
                                          <h2 className="font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                                                ติดต่อเรา
                                          </h2>
                                          <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                                                เราพร้อมรับฟังทุกความคิดเห็น ข้อเสนอแนะ และข้อสอบถามจากท่าน ไม่ว่าจะเป็นเรื่องกิจกรรม การสมัครสมาชิก หรือความร่วมมือในโครงการต่าง ๆ
                                          </p>
                                    </div>

                                    {/* Contact Cards */}
                                    <div className="space-y-4">
                                          {/* Phone Card */}
                                          <Card className="border-l-6 border-blue-600 transition-all duration-300 ease-in-out">
                                                <CardContent className="px-7 py-2 flex items-center space-x-6">
                                                      <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <Phone className="w-7 h-7 text-blue-700" />
                                                      </div>
                                                      <div>
                                                            <h4 className="text-xl font-semibold text-gray-900 mb-1">โทรศัพท์</h4>
                                                            <p className="text-lg text-gray-700">065-3945821 อมีร (มุสลีมีน)</p>
                                                            <p className="text-sm text-gray-700 mt-1">094-5761369 อามีเราะห์ (มุสลีมะฮฺ)</p>
                                                      </div>
                                                </CardContent>
                                          </Card>

                                          {/* Email Card */}
                                          <Card className="border-l-6 border-blue-500 transition-all duration-300 ease-in-out">
                                                <CardContent className="px-7 py-2 flex items-center space-x-6">
                                                      <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <Mail className="w-7 h-7 text-blue-500" />
                                                      </div>
                                                      <div>
                                                            <h4 className="text-xl font-semibold text-gray-900 mb-1">อีเมล</h4>
                                                            <p className="text-lg text-gray-700">msspsuhatyai@gmail.com                                                            </p>
                                                            <p className="text-sm text-gray-500 mt-1">เราจะตอบกลับภายใน 24 ชั่วโมง</p>
                                                      </div>
                                                </CardContent>
                                          </Card>

                                          {/* Address Card */}
                                          <Card className="border-l-6 border-blue-300 transition-all duration-300 ease-in-out">
                                                <CardContent className="px-7 py-2 flex items-center space-x-6">
                                                      <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <MapPin className="w-7 h-7 text-blue-300" />
                                                      </div>
                                                      <div>
                                                            <h3 className="text-xl font-semibold text-gray-900 mb-1">ที่อยู่</h3>
                                                            <p className="text-lg text-gray-700">มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่</p>
                                                            <p className="text-sm text-gray-500 mt-1">อำเภอหาดใหญ่ จังหวัดสงขลา</p>
                                                      </div>
                                                </CardContent>
                                          </Card>
                                    </div>
                              </div>

                              {/* Google-map */}
                              <div className="mb-8">
                                    <h2 className="font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                                          ที่อยู่ของเรา
                                    </h2>
                                    <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                          <div style={{ paddingBottom: '56.25%', height: 0 }}>
                                                <iframe
                                                      src="https://maps.google.com/maps?q=7.0112681,100.4995467&z=17&output=embed"
                                                      width="100%"
                                                      height="100%"
                                                      className="absolute top-0 left-0 w-full h-full"
                                                      style={{ border: 0 }}
                                                      allowFullScreen
                                                      loading="lazy"
                                                      referrerPolicy="no-referrer-when-downgrade"
                                                      title="แผนที่ตำแหน่ง"
                                                ></iframe>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
}