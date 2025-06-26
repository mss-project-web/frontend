"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Award, Heart, ChevronRight, Star, ArrowRight } from "lucide-react"

export default function HomePage() {
  // Generate grid background images
  const generateGridImages = () => {
    const images = []
    const photoSources = [
      "/photo1.png",
      "/photo2.png",
      "/photo3.png",
      "/photo4.png",
      "/photo5.png",
      "/photo6.png",
      "/photo7.png",
      "/photo8.png",
    ]

    for (let i = 0; i < 64; i++) {
      // 8x8 = 64 cells
      images.push({
        id: i,
        src: photoSources[i % photoSources.length],
        opacity: Math.random() * 0.4 + 0.1, // Random opacity between 0.1-0.5
        delay: Math.random() * 2, // Random animation delay
      })
    }
    return images
  }

  const gridImages = generateGridImages()

  return (
    <div className="min-h-screen">
      {/* Hero Section with Grid Photo Gallery */}
      <section className="relative h-screen overflow-hidden">
        {/* Base Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600"></div>

        {/* Grid Photo Background */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-4">
          {gridImages.map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
              style={{
                animationDelay: `${image.delay}s`,
              }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`Grid Photo ${index + 1}`}
                fill
                className="object-cover transition-all duration-1000 hover:scale-110"
                style={{
                  opacity: image.opacity,
                  filter: "sepia(10%) saturate(120%) brightness(90%) hue-rotate(200deg)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20"></div>
            </div>
          ))}
        </div>

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

        {/* Vintage Text Overlay - Left Side with New Color Scheme */}
        <div className="absolute top-1/2 left-8 md:left-16 transform -translate-y-1/2 z-40">
          <div className="text-left">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold drop-shadow-2xl leading-none tracking-wider vintage-text-gradient"
              style={{
                fontFamily: "Kanit, sans-serif",
                background: "linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3, #54a0ff)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "4px 4px 8px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,0.6)",
                filter: "drop-shadow(0 0 20px rgba(255,107,107,0.4)) drop-shadow(0 0 30px rgba(254,202,87,0.3))",
                animation: "gradient-shift 4s ease-in-out infinite",
              }}
            >
              หวังดีๆ
            </h1>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl leading-none tracking-wider vintage-text-secondary mt-2"
              style={{
                fontFamily: "Kanit, sans-serif",
                background: "linear-gradient(135deg, #a8e6cf, #88d8c0, #ffd93d, #6c5ce7)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "4px 4px 8px rgba(0,0,0,0.8), 2px 2px 4px rgba(0,0,0,0.6)",
                filter: "drop-shadow(0 0 20px rgba(168,230,207,0.5)) drop-shadow(0 0 25px rgba(255,217,61,0.4))",
                animation: "gradient-shift 4s ease-in-out infinite 1s",
              }}
            >
              จากบ้านหลังเดิม
            </h2>
            <div className="mt-6 text-white/95 text-lg md:text-xl max-w-md">
              <p
                className="drop-shadow-lg font-medium"
                style={{
                  fontFamily: "Kanit, sans-serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                  background: "linear-gradient(90deg, #ffffff, #e3f2fd, #ffffff)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  animation: "text-shimmer 3s ease-in-out infinite",
                }}
              >
                ชมรมที่รวมพลังคนรุ่นใหม่ เพื่อสร้างสรรค์กิจกรรมดีๆ และสานต่อความสัมพันธ์อันดีงาม
              </p>
            </div>
          </div>
        </div>

        {/* Wave Transition at Bottom */}
        <div className="absolute bottom-0 w-full h-32 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            {/* Wave layers that connect to the next section */}
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="#f0f9ff" opacity="0.8" />
            <path d="M0,80 C400,20 800,100 1200,40 L1200,120 L0,120 Z" fill="#e0f2fe" opacity="0.6" />
            <path d="M0,100 C600,40 600,80 1200,60 L1200,120 L0,120 Z" fill="#f8fafc" opacity="0.9" />
          </svg>

          {/* Animated floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="wave-particle absolute top-4 left-[10%] w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
            <div
              className="wave-particle absolute top-8 left-[25%] w-1 h-1 bg-cyan-300 rounded-full opacity-40"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="wave-particle absolute top-6 left-[45%] w-3 h-3 bg-purple-300 rounded-full opacity-50"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="wave-particle absolute top-10 left-[65%] w-1.5 h-1.5 bg-blue-400 rounded-full opacity-70"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="wave-particle absolute top-5 left-[80%] w-2 h-2 bg-cyan-400 rounded-full opacity-45"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="wave-particle absolute top-12 left-[90%] w-1 h-1 bg-purple-400 rounded-full opacity-60"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Stats Section - Connected seamlessly */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "200+", label: "สมาชิกชมรม", color: "from-blue-500 to-blue-600" },
              { icon: Calendar, number: "50+", label: "กิจกรรมต่อปี", color: "from-purple-500 to-purple-600" },
              { icon: Award, number: "15+", label: "รางวัลที่ได้รับ", color: "from-green-500 to-green-600" },
              { icon: Heart, number: "5", label: "ปีที่ก่อตั้ง", color: "from-pink-500 to-pink-600" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: "Kanit, sans-serif" }}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600" style={{ fontFamily: "Kanit, sans-serif" }}>
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "Kanit, sans-serif" }}>
              พร้อมเข้าร่วมกับเราแล้วหรือยัง?
            </h2>
            <p className="text-xl mb-8 text-gray-100" style={{ fontFamily: "Kanit, sans-serif" }}>
              มาร่วมเป็นส่วนหนึ่งของครอบครัวชมรมมุสลิม ม.อ.หาดใหญ่ และสร้างความทรงจำดีๆ ไปด้วยกัน
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl hover:shadow-white/25 transition-all duration-300"
                  style={{ fontFamily: "Kanit, sans-serif" }}
                >
                  ติดต่อสอบถาม
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
