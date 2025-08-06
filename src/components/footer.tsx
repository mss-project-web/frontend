import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { navItems } from "@/data/nav-items"
import { CONTACT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 text-white text-sm">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Club Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className="w-36 h-14 relative mx-auto md:mx-0">
              <Image
                src="/LOGO/LOGO-MSS_white.png"
                alt="logo-MSS"
                fill
                sizes="(max-width: 768px) 120px, (max-width: 1200px) 200px, 250px"
              />
            </div>
            <div className="w-20 border-t-2 border-blue-400 mx-auto md:mx-0" />
            <p className="text-gray-300 italic tracking-wide">
              หวังดีดี จากบ้านหลังเดิม
            </p>
          </div>

          {/* Main Menu */}
          <div className="space-y-4 text-center md:text-left">
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
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-semibold text-lg text-white">ลิงก์อื่น ๆ</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-white transition"
                >
                  ข่าวสารต่างๆ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-semibold text-lg text-white">ติดต่อเรา</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{CONTACT.phone_Amir}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{CONTACT.email}</span>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-3 text-center md:text-left">
                <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  มหาวิทยาลัยสงขลานครินทร์
                  <br />
                  วิทยาเขตหาดใหญ่
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="text-gray-400 text-center text-sm sm:text-base">
            © 2025 ชมรมมุสลิม ม.อ.หาดใหญ่ MSS PSU Hatyai. สงวนลิขสิทธิ์.
          </div>
        </div>
      </div>
    </footer>

  )
}
