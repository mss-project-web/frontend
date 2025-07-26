import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Guidelines() {

      return (
            <section className="py-8">
                  <div className="container mx-auto px-3">
                        <div className="text-center mb-6">
                              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">แนวทางการใช้ห้องละหมาด</h2>
                              <p className="text-sm sm:text-lg text-gray-600">กฎและข้อปฏิบัติสำหรับการใช้ห้องละหมาดอย่างเหมาะสม</p>
                        </div>

                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white">
                              <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6">
                                          <CardTitle className="text-lg sm:text-2xl font-bold flex items-center space-x-2">
                                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                      <div className="w-3 h-3 bg-white rounded-full"></div>
                                                </div>
                                                <span>สิ่งที่ควรทำ</span>
                                          </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                          <ul className="space-y-3">
                                                {[
                                                      { text: "ถอดรองเท้าก่อนเข้าห้องละหมาด", icon: "👟" },
                                                      { text: "รักษาความเงียบและสงบ", icon: "🤫" },
                                                      { text: "ทำความสะอาดหลังใช้งาน", icon: "🧹" },
                                                      { text: "แต่งกายสุภาพเรียบร้อย", icon: "👔" },
                                                      { text: "เคารพผู้ที่กำลังละหมาด", icon: "🤲" }
                                                ].map((item, index) => (
                                                      <li key={index} className="flex items-start space-x-3 group">
                                                            <div className="text-xl">{item.icon}</div>
                                                            <div className="flex-1">
                                                                  <span className="text-sm text-gray-700">{item.text}</span>
                                                            </div>
                                                      </li>
                                                ))}
                                          </ul>
                                    </CardContent>
                              </Card>

                              <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 sm:p-6">
                                          <CardTitle className="text-lg sm:text-2xl font-bold flex items-center space-x-2">
                                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                      <div className="w-3 h-3 bg-white rounded-full"></div>
                                                </div>
                                                <span>สิ่งที่ไม่ควรทำ</span>
                                          </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                          <ul className="space-y-3">
                                                {[
                                                      { text: "ห้ามใช้โทรศัพท์เสียงดัง", icon: "📵" },
                                                      { text: "ห้ามนำอาหารเข้าไป", icon: "🚫" },
                                                      { text: "ห้ามสูบบุหรี่", icon: "🚭" },
                                                      { text: "ห้ามใช้เป็นที่นอน", icon: "🛏️" },
                                                      { text: "ห้ามรบกวนผู้อื่น", icon: "🔇" }
                                                ].map((item, index) => (
                                                      <li key={index} className="flex items-start space-x-3 group">
                                                            <div className="text-xl">{item.icon}</div>
                                                            <div className="flex-1">
                                                                  <span className="text-sm text-gray-700">{item.text}</span>
                                                            </div>
                                                      </li>
                                                ))}
                                          </ul>
                                    </CardContent>
                              </Card>
                        </div>
                  </div>
            </section>
      )
}