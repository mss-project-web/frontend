"use client"

import { useState } from "react"
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

export default function AboutPage() {
      const [expandedSection, setExpandedSection] = useState<string | null>("story")
      const [activeTab, setActiveTab] = useState("mission")

      const toggleSection = (section: string) => {
            setExpandedSection(expandedSection === section ? null : section)
      }

      return (
            <div className="relative min-h-screen font-sans">
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
                                    <nav className="mb-6 flex items-center justify-center space-x-2 text-base text-gray-600">
                                          <Link href="/" className="hover:underline hover:text-blue-600 transition-colors">
                                                หน้าหลัก
                                          </Link>
                                          <span className="text-gray-400">/</span>
                                          <span className="font-medium text-blue-800 flex items-center space-x-1">
                                                <span>เกี่ยวกับ</span>
                                          </span>
                                    </nav>

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
                                                size="lg"
                                                variant="outline"
                                                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
                                          >
                                                เรียนรู้เพิ่มเติม
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Story Section */}
                  <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
                        <div className="mx-auto max-w-screen-xl px-4"> 
                              <div className="mx-auto"> 
                                    <div className="text-center mb-10">
                                          <h2 className="font-bold text-gray-800 mb-2">เรื่องราวของเรา</h2>
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
                                                                  <div className="space-y-4 text-gray-600">
                                                                        <p>
                                                                              ในปี 2020 กลุ่มนักศึกษาแพทย์ที่มีความฝันเดียวกันได้รวมตัวกันเพื่อสร้างชมรมที่จะเป็นพื้นที่ในการแลกเปลี่ยนเรียนรู้
                                                                              และสร้างสรรค์กิจกรรมที่มีประโยชน์
                                                                        </p>
                                                                        <p>ด้วยความมุ่งมั่นและความตั้งใจจริง เราได้เริ่มต้นจากการจัดกิจกรรมเล็กๆ ภายในคณะและค่อยๆ ขยายวงกว้างออกไป</p>
                                                                        <p>วันนี้ เราภูมิใจที่ได้เป็นส่วนหนึ่งในการพัฒนานักศึกษาและสร้างผลกระทบเชิงบวกต่อสังคม</p>
                                                                  </div>
                                                            )}
                                                      </CardContent>
                                                </Card>

                                                <Card
                                                      className="border-0 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white"
                                                      onClick={() => toggleSection("vision")}
                                                >
                                                      <CardContent className="p-8">
                                                            <div className="flex items-center justify-between mb-4">
                                                                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                                                        <Target className="w-6 h-6 mr-3 text-blue-600" />
                                                                        วิสัยทัศน์
                                                                  </h3>
                                                                  {expandedSection === "vision" ? (
                                                                        <ChevronUp className="w-6 h-6 text-gray-500" />
                                                                  ) : (
                                                                        <ChevronDown className="w-6 h-6 text-gray-500" />
                                                                  )}
                                                            </div>
                                                            {expandedSection === "vision" && (
                                                                  <div className="space-y-4 text-gray-600">
                                                                        <p className="text-lg font-semibold text-blue-600">
                                                                              "เป็นชมรมต้นแบบที่สร้างคนดีให้สังคม ผ่านกิจกรรมที่หลากหลายและการเรียนรู้ร่วมกัน"
                                                                        </p>
                                                                        <p>เรามุ่งมั่นที่จะเป็นแรงบันดาลใจให้กับนักศึกษารุ่นใหม่ในการพัฒนาตนเองและสร้างสรรค์สิ่งดีๆ ให้กับสังคม</p>
                                                                  </div>
                                                            )}
                                                      </CardContent>
                                                </Card>
                                          </div>

                                          <div className="relative">
                                                <div className="grid grid-cols-2 gap-4">
                                                      <Image
                                                            src="/LOGO-MSS0.jpg?height=300&width=300"
                                                            alt="ชมรมหลังเดิม"
                                                            width={300}
                                                            height={300}
                                                            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                                      />

                                                      <Image
                                                            src="/LOGO-MSS1.jpg?height=300&width=300"
                                                            alt="กิจกรรมชมรม"
                                                            width={300}
                                                            height={300}
                                                            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-8"
                                                      />
                                                      <Image
                                                            src="/LOGO-MSS.jpg?height=300&width=300"
                                                            alt="สมาชิกชมรม"
                                                            width={300}
                                                            height={300}
                                                            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 -mt-8"
                                                      />
                                                      <Image
                                                            src="/LOGO-MSS.jpg?height=300&width=300"
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
                  </section>
                  <AyatQuran />
                  <Mission />
                  <President />
            </div>
      )
}