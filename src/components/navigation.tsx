"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Menu,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Hash,
} from "lucide-react";
import { navItems } from "@/data/nav-items";
import { CONTACT } from "@/lib/constants";
import { useSettings } from "@/hooks/useSettings";
import { DonationModal } from "@/components/donation-modal";
import { useClickTracking } from "@/hooks/use-click-tracking";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { settings } = useSettings();
  const pathname = usePathname();
  const { trackEvent } = useClickTracking();

  // Site info from settings, falling back to the bundled constants.
  const firstPhone = settings.contact.phones[0];
  const phoneText = firstPhone
    ? firstPhone.label
      ? `${firstPhone.number} (${firstPhone.label})`
      : firstPhone.number
    : CONTACT.phone_Amir;
  const email = settings.contact.email || CONTACT.email;
  const facebook = settings.contact.socials.facebook || CONTACT.facebook;
  const instagram = settings.contact.socials.instagram || CONTACT.instagram;
  const youtube = settings.contact.socials.youtube || CONTACT.youtube;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide nav on standalone pages
  if (pathname === "/links") return null;

  const handleSupportClick = () => {
    trackEvent("click_support_button", { location: "desktop_header" });
    setShowModal(true);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-xs">{phoneText}</span>
              </div>
              <div className="flex items-center space-x-2 md:hidden">
                <Hash className="w-4 h-4" />
                <button
                  onClick={() => {
                    trackEvent("click_support_button", {
                      location: "mobile_topbar",
                    });
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
                <span>{email}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>ติดตามเรา:</span>
              <div className="flex space-x-2">
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("social_click", { platform: "facebook" })
                  }
                >
                  <Facebook className="w-4 h-4 hover:text-blue-200 transition" />
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("social_click", { platform: "instagram" })
                  }
                >
                  <Instagram className="w-4 h-4 hover:text-blue-200 transition" />
                </a>
                <a
                  href={CONTACT.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("social_click", { platform: "youtube" })
                  }
                >
                  <Youtube className="w-4 h-4 hover:text-blue-200 transition" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-200"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link
              href="/"
              className="inline-block group"
              onClick={() => trackEvent("nav_click", { item: "logo" })}
            >
              <div className="w-32 h-12 relative group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={siteConfig.logo_mss}
                  alt={siteConfig.logoAlt}
                  fill
                  sizes="(max-width: 768px) 120px, (max-width: 1200px) 200px, 250px"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8" data-nosnippet>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => trackEvent("nav_click", { item: item.label })}
                  className={`relative text-xs sm:text-xs lg:text-base font-medium transition-colors duration-300 hover:text-blue-600 ${
                    pathname === item.href ? "text-blue-600" : "text-gray-700"
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
                onClick={handleSupportClick}
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
                      src={siteConfig.logo_mss}
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      alt={siteConfig.logoAlt}
                      className="object-contain"
                      priority
                    />
                  </div>

                  <p className="mt-1 text-center text-blue-700 font-semibold text-sm italic">
                    หวังดีดี จากบ้านหลังเดิม
                  </p>
                </div>
                <nav className="flex flex-col space-y-4 mt-2" data-nosnippet>
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-2 py-1 rounded-md text-lg font-semibold transition-colors duration-300 ${
                            isActive
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
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
      <DonationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
