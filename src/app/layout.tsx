import type React from "react"
import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["400", "500", "700"],
  variable: "--font-kanit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ชมรมมุสลิม ม.อ.หาดใหญ่",
  description: "หวังดีๆ จากบ้านหลังเดิม",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={kanit.variable} suppressHydrationWarning>
      <body className="font-sans">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
