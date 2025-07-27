"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, Phone, Mail, Facebook, Instagram, Youtube, Copy, Check, Hash } from "lucide-react"
import { navItems } from "@/data/nav-items"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname()

  const handleBackdropClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showModal])

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("1234567890").then(
      () => setIsCopied(true),
      () => console.error("Failed to copy account number")
    )
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-xs">065-394-5821 (อมีร)</span>
              </div>
              <div className="flex items-center space-x-2 md:hidden">
                <Hash className="w-4 h-4" />
                <button
                  onClick={() => {
                    setShowModal(true);
                    setIsSheetOpen(false);
                  }}
                  className="text-xs text-white hover:text-blue-200 transition"
                >
                  สนับสนุนการทำงานของชมรม
                </button>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>msspsuhatyai1@gmail.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>ติดตามเรา:</span>
              <div className="flex space-x-2">
                <a href="https://www.facebook.com/MSSPSU" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4 hover:text-blue-200 transition" />
                </a>
                <a href="https://www.instagram.com/msspsuhatyai/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4 hover:text-blue-200 transition" />
                </a>
                <a href="https://www.youtube.com/@msspsuhatyai" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4 hover:text-blue-200 transition" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-200"
          : "bg-white border-b border-gray-100"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="inline-block group">
              <div className="w-32 h-12 relative group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/LOGO/LOGO-MSS.png"
                  alt="logo-MSS"
                  fill
                  sizes="(max-width: 768px) 120px, (max-width: 1200px) 200px, 250px"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-colors duration-300 hover:text-blue-600 ${pathname === item.href ? "text-blue-600" : "text-gray-700"
                    }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                สนับสนุนการทำงานของชมรม
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-6 h-6 text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-white p-6 shadow-xl"
                overlayClassName="bg-blue-900/50 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center">
                  <div className="w-32 h-16 relative">
                    <Image
                      src="/LOGO/LOGO-MSS.png"
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      alt="logo"
                      className="object-contain"
                      priority
                    />
                  </div>

                  <p className="mt-1 text-center text-blue-700 font-semibold text-sm italic">
                    หวังดีดี จากบ้านหลังเดิม
                  </p>
                </div>
                <nav className="flex flex-col space-y-4 mt-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <SheetClose asChild key={item.href}><Link
                        href={item.href}
                        className={`block px-2 py-1 rounded-md text-lg font-semibold transition-colors duration-300 ${isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                      >
                        {item.label}
                      </Link></SheetClose>
                    )
                  })}
                </nav>
                <Button
                  onClick={() => {
                    setShowModal(true);
                    setIsSheetOpen(false);
                  }}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  สนับสนุนการทำงานของชมรม
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={handleBackdropClick}>
          <div className="modal-content bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition text-xl"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-xl font-semibold text-center text-blue-800 mb-4">
              สนับสนุนการทำงานของชมรม
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-[220px] h-[220px]">
                <Image
                  src="/qr-promptpay-mss.jpg"
                  alt="QR พร้อมเพย์"
                  fill
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm text-gray-700">
                  ชื่อบัญชี: <span className="font-semibold">นางสาวซอฟีเราะห์ ดอเลาะ</span>
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-sm text-gray-700">
                    เลขบัญชี: <span className="font-semibold text-blue-800 tracking-wider">153-8-50729-2</span>
                  </p>
                  <button
                    onClick={copyAccountNumber}
                    className="text-blue-600 hover:text-blue-800 transition"
                    aria-label="คัดลอกเลขบัญชี"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm text-gray-700">
                  ธนาคารกสิกรไทย
                </p>
                <p className="text-xs text-gray-500">
                  * รองรับสแกนผ่านแอปธนาคารทุกประเภท
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}