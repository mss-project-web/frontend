"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram } from "lucide-react"

//components
import ContactUsSection from "@/components/contect/ContactUsSection"
import FAQSection from "@/components/contect/FAQSection"

//Data
import { socialMediaData } from "@/data/socialMediaData"

export default function ContactPage() {
      const iconMap: { [key: string]: React.ReactNode } = {
            Facebook: <Facebook className="w-5 h-5" />,
            Instagram: <Instagram className="w-5 h-5" />,
          }
          
      return (
            <main className="relative min-h-screen overflow-hidden">
                  {/* Hero Section */}
                  <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                        <div className="container mx-auto px-4">
                              <div className="max-w-3xl mx-auto text-center">
                                    <nav className="mb-6 flex items-center justify-center space-x-2 text-base text-white">
                                          <Link href="/" className="hover:underline hover:text-blue-100 transition-colors">
                                                หน้าหลัก
                                          </Link>
                                          <span className="text-gray-400">/</span>
                                          <span className="font-medium text-blue-100 flex items-center space-x-1">
                                                <span>ติดต่อเรา</span>
                                          </span>
                                    </nav>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4">ติดต่อสอบถาม</h1>
                                    <p className="text-lg md:text-xl opacity-90">
                                          เรายินดีรับฟังความคิดเห็น ข้อเสนอแนะ และคำถามจากทุกท่าน
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Contact Section */}
                  <ContactUsSection />

                  {/* Enhanced Social Media Section */}
                  <section className="relative z-10 mx-auto max-w-screen-xl px-1 py-10 bg-white">
                        <div className="container mx-auto px-1 space-y-12">
                              <div className="text-center">
                                    <h2 className="font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                                          ติดตามเราได้ที่
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                                          ติดตามข่าวสารและกิจกรรมของเราผ่านช่องทางต่างๆ เพื่อไม่พลาดอัพเดทใหม่ๆ
                                    </p>
                              </div>

                              {/* Enhanced Social Media Grid */}
                              <div className="bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                    {socialMediaData.map((social, index) => (
                                          <Card
                                                key={index}
                                                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${social.borderColor.replace('border-l-4', 'bg-gradient-to-br')} bg-white/80 backdrop-blur-sm overflow-hidden group transform hover:scale-105`}
                                          >
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <CardContent className="px-3 py-6 relative z-10">
                                                      {/* Logo Section */}
                                                      <div className="text-center mb-6">
                                                            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4 transition-all">
                                                                  <Image
                                                                        src={social.icon}
                                                                        alt={`${social.platform} logo`}
                                                                        width={150}
                                                                        height={150}
                                                                        className="object-contain transition-transform"
                                                                  />
                                                            </div>
                                                            <h3 className="font-bold text-gray-800 text-2xl mb-2">{social.platform}</h3>
                                                            <p className="text-gray-600 text-sm">{social.description}</p>
                                                      </div>

                                                      {/* Pages Section */}
                                                      <div className="space-y-4">
                                                            {social.pages.map((page, pageIndex) => (
                                                                  <div
                                                                        key={pageIndex}
                                                                        className="flex items-center justify-between p-4 bg-white/70 rounded-xl hover:bg-white/90 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md group/item"
                                                                  >
                                                                        <div className="flex items-center space-x-3">
                                                                              <div className={`${social.iconColor} p-2 rounded-lg bg-white/80 shadow-sm group-hover/item:shadow-md transition-all duration-300`}>
                                                                                    {iconMap[page.icon]}
                                                                              </div>
                                                                              <span className="text-sm font-medium text-gray-800">{page.name}</span>
                                                                        </div>
                                                                        <div className="flex space-x-2">
                                                                              {page.links.map((link, linkIndex) => (
                                                                                    <Button
                                                                                          key={linkIndex}
                                                                                          size="sm"
                                                                                          className={`${social.buttonColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-medium rounded-lg`}
                                                                                          asChild
                                                                                    >
                                                                                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                                                                                <span>{link.platform}</span>
                                                                                          </a>
                                                                                    </Button>
                                                                              ))}
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                </CardContent>
                                          </Card>
                                    ))}
                              </div>
                        </div >
                  </section >

                  {/* FAQ Section */}
                  < div className="p-0" >
                        <FAQSection />
                  </div >
            </main >
      )
}