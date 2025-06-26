import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { navItems } from "@/app/data/nav-items"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 text-white text-sm">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="w-36 h-14 relative">
              <Image
                src="/LOGO-MSS_white.png"
                alt="ชมรมหลังเดิม MSS"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="w-20 border-t-2 border-blue-400" />
            <p className="text-gray-300 italic tracking-wide">
              หวังดีดี จากบ้านหลังเดิม
            </p>
          </div>

          {/* Main Menu */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">เมนูหลัก</h4>
            <ul className="space-y-2">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">ลิงก์อื่น ๆ</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="text-gray-300 hover:text-white transition"
                >
                  สนับสนุนการทำงานของชมรม
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">ติดต่อเรา</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-gray-300">065-394-5821 (อมีรชมรม)</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-gray-300">msspsuhatyai@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  มหาวิทยาลัยสงขลานครินทร์<br />วิทยาเขตหาดใหญ่
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-gray-400 text-center">
            © 2025 ชมรมมุสลิม ม.อ.หาดใหญ่ MSS PSU Hatyai. สงวนลิขสิทธิ์.
          </p>
        </div>
      </div>
    </footer>
  )
}
