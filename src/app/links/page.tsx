"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Home, ChevronRight, Share2 } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { useSettings } from "@/hooks/useSettings";
import { DonationModal } from "@/components/donation-modal";
import { siteConfig } from "@/config/site";

interface SocialLink {
  id: string;
  label: string;
  sublabel: string;
  href?: string;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  isPrimary?: boolean;
  onClick?: () => void;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function LinksPage() {
  const { settings } = useSettings();
  const email = settings.contact.email || CONTACT.email;
  const facebook =
    settings.contact.socials.facebook || "https://www.facebook.com/MSSPSU";
  const instagram =
    settings.contact.socials.instagram ||
    "https://www.instagram.com/msspsuhatyai/";
  const tiktok =
    settings.contact.socials.tiktok || "https://www.tiktok.com/@msspsuhatyai";
  const youtube =
    settings.contact.socials.youtube || "https://www.youtube.com/@msspsuhatyai";

  const [showDonateModal, setShowDonateModal] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setShareSupported(true);
    }
  }, []);

  useEffect(() => {
    if (showDonateModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDonateModal]);

  // Click Tracking Function
  const trackClick = (id: string, label: string) => {
    // In production, you would add Google Analytics or Facebook Pixel here
    // e.g., window.gtag('event', 'click', { event_category: 'social_links', event_label: id });
  };

  // Share Function (Web Share API)
  const handleShare = async () => {
    trackClick("share", "Share Button");
    try {
      await navigator.share({
        title: "ชมรมมุสลิม ม.อ.หาดใหญ่",
        text: "ช่องทางการติดต่อและลิงก์ทั้งหมดของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing", error);
    }
  };

  const links: SocialLink[] = [
    {
      id: "donate",
      label: "สนับสนุนการทำงานของชมรม",
      sublabel: "ร่วมบริจาคเพื่อสนับสนุนกิจกรรม",
      icon: <Heart className="w-5 h-5" />,
      isPrimary: true,
      onClick: () => {
        trackClick("donate", "Donation Modal");
        setShowDonateModal(true);
      },
    },
    {
      id: "facebook",
      label: "Facebook",
      sublabel: "ชมรมมุสลิม ม.อ.หาดใหญ่",
      href: facebook,
      icon: <FacebookIcon />,
      iconBg: "bg-slate-100 ",
      iconColor: "text-slate-700 ",
    },
    {
      id: "instagram",
      label: "Instagram",
      sublabel: "@msspsuhatyai",
      href: instagram,
      icon: <InstagramIcon />,
      iconBg: "bg-slate-100 ",
      iconColor: "text-slate-700 ",
    },
    {
      id: "tiktok",
      label: "TikTok",
      sublabel: "@msspsuhatyai",
      href: tiktok,
      icon: <TiktokIcon />,
      iconBg: "bg-slate-100 ",
      iconColor: "text-slate-700 ",
    },
    {
      id: "youtube",
      label: "YouTube",
      sublabel: "ชมรมมุสลิม ม.อ.หาดใหญ่",
      href: youtube,
      icon: <YoutubeIcon />,
      iconBg: "bg-slate-100 ",
      iconColor: "text-slate-700 ",
    },
    {
      id: "email",
      label: "อีเมล",
      sublabel: email,
      href: `mailto:${email}`,
      icon: <MailIcon />,
      iconBg: "bg-slate-100 ",
      iconColor: "text-slate-700 ",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 font-sans">
      <div className="w-full max-w-md relative z-10">
        {/* Profile Section */}
        <motion.div
          className="flex flex-col items-center mb-8 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {shareSupported && (
            <button
              onClick={handleShare}
              className="absolute top-0 right-0 p-2.5 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors z-20"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}

          <div className="relative mb-5">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center p-2 shadow-sm border border-gray-200">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.logoAlt}
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-900 text-center mb-1">
            ชมรมมุสลิม ม.อ.หาดใหญ่
          </h1>
          <p className="text-gray-500 text-sm text-center mb-4">
            Muslim Student Society · PSU Hat Yai
          </p>

          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              หวังดีดี จากบ้านหลังเดิม
            </span>
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {links.map((link) => {
            const content = (
              <>
                {/* Icon Wrapper */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    link.isPrimary
                      ? "text-white"
                      : `${link.iconBg} ${link.iconColor}`
                  }`}
                >
                  {link.icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 ml-1">
                  <div
                    className={`text-base font-semibold truncate ${
                      link.isPrimary ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {link.label}
                  </div>
                  <div
                    className={`text-sm truncate mt-0.5 ${
                      link.isPrimary ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {link.sublabel}
                  </div>
                </div>

                {/* Right Arrow */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    link.isPrimary ? "text-white opacity-80" : "text-gray-400"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </div>
              </>
            );

            const baseClasses =
              "flex items-center gap-3 w-full p-3 rounded-2xl transition-all duration-200 relative overflow-hidden";

            if (link.isPrimary) {
              return (
                <motion.button
                  key={link.id}
                  onClick={link.onClick}
                  className={`${baseClasses} bg-blue-600 hover:bg-blue-700 shadow-sm text-left`}
                  variants={itemVariants}
                >
                  {content}
                </motion.button>
              );
            }

            if (link.onClick && !link.href) {
              return (
                <motion.button
                  key={link.id}
                  onClick={link.onClick}
                  className={`${baseClasses} bg-white border border-gray-200 hover:bg-gray-50 shadow-sm text-left`}
                  variants={itemVariants}
                >
                  {content}
                </motion.button>
              );
            }

            return (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={() => trackClick(link.id, link.label)}
                target={link.href?.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href?.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`${baseClasses} bg-white border border-gray-200 hover:bg-gray-50 shadow-sm`}
                variants={itemVariants}
              >
                {content}
              </motion.a>
            );
          })}

          {/* Back to Home Link */}
          <motion.a
            href="/"
            onClick={() => trackClick("home", "Back to Home")}
            className="flex items-center justify-center gap-2 w-full p-4 mt-6 rounded-xl border border-gray-200 hover:bg-gray-50 bg-white transition-colors duration-200 shadow-sm text-gray-700"
            variants={itemVariants}
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-semibold">
              กลับสู่หน้าหลักเว็บไซต์
            </span>
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="border-t border-white/10">
            <div className="container mx-auto px-4 py-4">
              <div className="text-gray-400 text-center text-xs sm:text-base">
                © 2025 ชมรมมุสลิม ม.อ.หาดใหญ่ MSS PSU Hatyai. สงวนลิขสิทธิ์.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Donate Modal */}
      <DonationModal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
      />
    </main>
  );
}
