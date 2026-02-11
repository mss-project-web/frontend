"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Target, ChevronDown, ChevronUp, BookOpen, ArrowRight, Play } from "lucide-react"

// components
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedCounterPage } from "@/components/home/AnimatedCounter";
import { AyatQuran } from "@/components/about/AyatQuran";
import { Mission } from "@/components/about/Mission";
import { President } from "@/components/about/President";
import BackgroundPaths from "@/components/about/BackgroundPaths";

export default function AboutPage() {
      const [expandedSection, setExpandedSection] = useState<string | null>("story")
      const [shouldScroll, setShouldScroll] = useState(false)

      const toggleSection = (section: string) => {
            setExpandedSection(expandedSection === section ? null : section)
      }

      useEffect(() => {
            if (shouldScroll) {
                  const element = document.getElementById('history');
                  if (element) {
                        setTimeout(() => {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              setShouldScroll(false);
                        }, 100);
                  } else {
                        console.error("Element with ID 'history' not found.");
                  }
            }
      }, [shouldScroll]);

      return (
            <main className="relative min-h-screen font-sans">
                  {/* Hero Section (Introduction) */}
                  <section className="relative py-20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
                              <div className="absolute inset-0 opacity-30">
                                    {/* Decorative background elements */}
                                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                                    <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                                    <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
                              </div>
                        </div>
                        {/* Content aligned with HomePage's max-w-screen-xl and px-4 */}
                        <div className="relative z-10 mx-auto max-w-screen-xl px-4"> {/* Adjusted */}
                              <div className="mx-auto text-center"> {/* Removed max-w-4xl to let content fill max-w-screen-xl */}
                                    <div className="text-6xl md:text-7xl font-bold mb-8">
                                          <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 bg-clip-text text-transparent">
                                                ชมรมมุสลิม ม.อ.หาดใหญ่
                                          </span>
                                    </div>
                                    <div className="text-2xl italic text-gray-600 leading-relaxed mb-8">
                                          หวังดีดี จากบ้านหลังเดิม
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                          <Button
                                                size="lg"
                                                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-lg px-8 py-4"
                                          >
                                                <Play className="w-5 h-5 mr-2" />
                                                ดูวิดีโอแนะนำ
                                          </Button>
                                          <Button
                                                onClick={() => setShouldScroll(true)}
                                                size="lg"
                                                variant="outline"
                                                className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 cursor-pointer"
                                          >
                                                เรียนรู้เพิ่มเติม
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </section >

                  {/* Story Section */}
                  < section className="py-20" >
                        <div className="absolute inset-0 z-[-10] bg-gradient-to-br from-blue-50 to-blue-100">
                              <BackgroundPaths />
                        </div>
                        <div className="z-0 mx-auto max-w-screen-xl px-4">
                              <div className="mx-auto">
                                    <div className="text-center mb-10">
                                          <h2 id="history" className="text-3xl font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">เรื่องราวของเรา</h2>
                                          <p className="text-lg text-gray-600">
                                                ประวัติความเป็นมาของชมรมมุสลิม ม.อ.หาดใหญ่
                                          </p>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                          <div className="space-y-6">
                                                <Card
                                                      className="border-0 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white"
                                                      onClick={() => toggleSection("story")}
                                                >
                                                      <CardContent className="p-8">
                                                            <div className="flex items-center justify-between mb-4">
                                                                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                                                        <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                                                                        จุดเริ่มต้น
                                                                  </h3>
                                                                  {expandedSection === "story" ? (
                                                                        <ChevronUp className="w-6 h-6 text-gray-500" />
                                                                  ) : (
                                                                        <ChevronDown className="w-6 h-6 text-gray-500" />
                                                                  )}
                                                            </div>
                                                            {expandedSection === "story" && (
                                                                  <div className="space-y-4 text-gray-700 leading-relaxed">
                                                                        <p>
                                                                              ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ เป็นชมรมหนึ่งที่ก่อตั้งมายาวนาน
                                                                              เนื่องด้วยความจำเป็นจากหลักการของศาสนาที่กำหนด เช่น เรื่องการรับประทานอาหารที่ถูกต้องตามหลักการศาสนาอิสลาม
                                                                              หรือเรื่องการปฏิบัติศาสนกิจร่วมกัน
                                                                        </p>
                                                                        <p>
                                                                              ก่อนที่จะก่อตั้งชมรมมุสลิมฯ อย่างเป็นทางการนั้น มีการรวมกลุ่มกันมาก่อน มีลักษณะเป็นการรวมกลุ่มเล็กๆ
                                                                              ต่อมามีการยื่นคำร้องขอจัดตั้งชมรมมุสลิมอย่างเป็นทางการเป็นครั้งแรก โดยใช้ชื่อ
                                                                              “ชมรมมุสลิมมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่”
                                                                              (Muslim Student Club of Prince of Songkla University, Hat Yai Campus)
                                                                              และใช้ “อัล กะอ์บะฮ์” เป็นตราสัญลักษณ์ของชมรม (ภาพที่ 3)
                                                                              ทั้งนี้เพื่อแสดงถึงจุดยืนในฐานะมุสลิม การรวมตัวกัน และความเป็นอันหนึ่งอันเดียวกันของอิสลาม
                                                                        </p>
                                                                        <p>
                                                                              ประธานชมรมคนแรก คือ นายอสิ มะหะมัดยังกี นักศึกษาคณะแพทยศาสตร์
                                                                              โดยมีอาจารย์อภิชาต ธรรมรักษ์ อาจารย์ภาควิชาชีววิทยา คณะวิทยาศาสตร์
                                                                              เป็นอาจารย์ที่ปรึกษาของชมรมฯ ใน พ.ศ. 2521
                                                                        </p>
                                                                        <p>
                                                                              จำนวนสมาชิกในยุคนี้มีไม่มากนัก เพราะนักศึกษามุสลิมในมหาวิทยาลัยมีจำนวนน้อย
                                                                              ห้องชมรมมุสลิมฯ ตั้งอยู่ที่ชั้น 2 ของโรงอาหารในสมัยนั้น ที่เรียกว่า “คาเฟตฯ”
                                                                              (ประธานชมรมมุสลิมฯ, สัมภาษณ์วันที่ 23 กุมภาพันธ์ 2555)
                                                                        </p>
                                                                  </div>

                                                            )}
                                                      </CardContent>
                                                </Card>
                                          </div>
                                          <div className="relative">
                                                <div className="grid grid-cols-2 gap-4">
                                                      <Image
                                                            src="/LOGO/about/LOGO-MSS0.jpg"
                                                            alt="ชมรมหลังเดิม"
                                                            width={300}
                                                            height={300}
                                                            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                                      />

                                                      <Image
                                                            src="/LOGO/about/LOGO-MSS1.jpg"
                                                            alt="กิจกรรมชมรม"
                                                            width={300}
                                                            height={300}
                                                            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-8"
                                                      />
                                                      <Image
                                                            src="/LOGO/about/LOGO-MSS2.jpg"
                                                            alt="สมาชิกชมรม"
                                                            width={300}
                                                            height={300}
                                                            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 -mt-8"
                                                      />
                                                      <Image
                                                            src="/LOGO/about/LOGO-MSS.jpg"
                                                            alt="ความสำเร็จ"
                                                            width={300}
                                                            height={300}
                                                            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className="mx-auto max-w-screen-xl px-4 pt-16">
                              <AnimatedCounterPage />
                        </div>
                  </section >
                  <AyatQuran />
                  <Mission />
                  <President />
            </main >
      )
}