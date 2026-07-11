"use client";

import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, Copy, Heart, Phone, Home, ChevronRight, Share2, MapPin, Download } from "lucide-react";
import { CONTACT } from "@/lib/constants";

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

const LineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
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
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function LinksPage() {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setShareSupported(true);
    }
  }, []);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(CONTACT.accountNumber).then(
      () => setIsCopied(true),
      () => console.error("Failed to copy account number")
    );
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);
  
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
    console.log(`[Analytics] User clicked: ${id} - ${label}`);
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
      console.log("Error sharing", error);
    }
  };

  // Download vCard Function
  const handleSaveContact = () => {
    trackClick("vcard", "Save Contact");
    const phone = CONTACT.phone_Amir.split(' ')[0].replace(/-/g, '');
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:ชมรมมุสลิม ม.อ.หาดใหญ่\nORG:มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่;\nTEL;TYPE=CELL:${phone}\nEMAIL:${CONTACT.email}\nURL:https://msspsuhatyai.org\nEND:VCARD`;
    
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mss-psu-hatyai.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
      href: "https://www.facebook.com/MSSPSU",
      icon: <FacebookIcon />,
      iconBg: "bg-[#1877F2]/10 dark:bg-[#1877F2]/20",
      iconColor: "text-[#1877F2] dark:text-[#3b8ef2]",
    },
    {
      id: "instagram",
      label: "Instagram",
      sublabel: "@msspsuhatyai",
      href: "https://www.instagram.com/msspsuhatyai/",
      icon: <InstagramIcon />,
      iconBg: "bg-[#C13584]/10 dark:bg-[#C13584]/20",
      iconColor: "text-[#C13584] dark:text-[#d34b97]",
    },
    {
      id: "tiktok",
      label: "TikTok",
      sublabel: "@msspsuhatyai",
      href: "https://www.tiktok.com/@msspsuhatyai",
      icon: <TiktokIcon />,
      iconBg: "bg-gray-200 dark:bg-gray-700",
      iconColor: "text-gray-900 dark:text-gray-100",
    },
    {
      id: "youtube",
      label: "YouTube",
      sublabel: "ชมรมมุสลิม ม.อ.หาดใหญ่",
      href: "https://www.youtube.com/@msspsuhatyai",
      icon: <YoutubeIcon />,
      iconBg: "bg-[#FF0000]/10 dark:bg-[#FF0000]/20",
      iconColor: "text-[#FF0000] dark:text-[#ff4d4d]",
    },
    {
      id: "line",
      label: "LINE Official",
      sublabel: "@mss-psu",
      href: "https://line.me/R/ti/p/@mss-psu",
      icon: <LineIcon />,
      iconBg: "bg-[#00B900]/10 dark:bg-[#00B900]/20",
      iconColor: "text-[#00B900] dark:text-[#19d619]",
    },
    {
      id: "phone",
      label: "ติดต่อด่วน (โทร)",
      sublabel: CONTACT.phone_Amir,
      href: `tel:${CONTACT.phone_Amir.split(' ')[0].replace(/-/g, '')}`,
      icon: <Phone className="w-5 h-5" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "email",
      label: "อีเมล",
      sublabel: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      icon: <MailIcon />,
      iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 flex flex-col items-center py-12 px-4 sm:px-6 relative overflow-hidden font-sans transition-colors duration-500">
      
      {/* Decorative Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-20">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Profile Section */}
        <motion.div
          className="flex flex-col items-center mb-8 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {shareSupported && (
            <button 
              onClick={handleShare}
              className="absolute top-0 right-0 p-2.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-full shadow-sm border border-white/60 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-700 transition-all z-20"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}

          <div className="relative mb-5 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-sky-300 dark:from-blue-600 dark:to-indigo-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            
            <div className="relative w-28 h-28 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center p-3 shadow-xl border border-white/50 dark:border-slate-700">
              <Image
                src="/LOGO/LOGO-MSS.png"
                alt="โลโก้ชมรมมุสลิม ม.อ.หาดใหญ่"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-blue-950 dark:text-blue-100 text-center mb-1 drop-shadow-sm">
            ชมรมมุสลิม ม.อ.หาดใหญ่
          </h1>
          <p className="text-blue-700/80 dark:text-blue-300/80 text-sm text-center mb-4 font-medium">
            Muslim Student Society · PSU Hat Yai
          </p>

          <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/60 dark:border-slate-700 rounded-full px-4 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-200">หวังดีดี จากบ้านหลังเดิม</span>
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="flex flex-col gap-3.5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {links.map((link) => {
            const content = (
              <>
                {/* Icon Wrapper */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  link.isPrimary 
                    ? "bg-white/20 text-white" 
                    : `${link.iconBg} ${link.iconColor}`
                }`}>
                  {link.icon}
                </div>
                
                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className={`text-base font-semibold truncate ${
                    link.isPrimary ? "text-white" : "text-gray-800 dark:text-gray-200"
                  }`}>
                    {link.label}
                  </div>
                  <div className={`text-sm truncate mt-0.5 ${
                    link.isPrimary ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {link.sublabel}
                  </div>
                </div>

                {/* Right Arrow */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                  link.isPrimary
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                }`}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </>
            );

            const baseClasses = "group flex items-center gap-4 w-full p-3 rounded-2xl transition-all duration-300 relative overflow-hidden";
            
            if (link.isPrimary) {
              return (
                <motion.button
                  key={link.id}
                  onClick={link.onClick}
                  className={`${baseClasses} bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-700 shadow-[0_8px_16px_-6px_rgba(59,130,246,0.5)] hover:shadow-[0_12px_20px_-6px_rgba(59,130,246,0.6)] hover:-translate-y-1 text-left`}
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
                  className={`${baseClasses} bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-6px_rgba(59,130,246,0.2)] hover:-translate-y-1 text-left`}
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
                rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${baseClasses} bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-6px_rgba(59,130,246,0.2)] hover:-translate-y-1`}
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
            className="group flex items-center gap-3 w-full p-3 mt-4 rounded-xl border-2 border-dashed border-blue-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-blue-900 dark:text-blue-200">กลับสู่หน้าหลัก</div>
              <div className="text-xs text-blue-600/70 dark:text-blue-400/70">ไปที่เว็บไซต์ msspsuhatyai.org</div>
            </div>
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <p className="text-sm text-blue-900/60 dark:text-blue-200/60 font-medium">
            © {new Date().getFullYear()} ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่
          </p>
        </motion.div>
      </div>

      {/* Donate Modal */}
      <AnimatePresence>
        {showDonateModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowDonateModal(false)}
          >
            <motion.div 
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 relative overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Background Decor */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60"></div>
              
              <button 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-800 dark:hover:text-gray-200 transition-colors z-10" 
                onClick={() => setShowDonateModal(false)}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-6 mt-2 relative z-10">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">สนับสนุนการทำงานของชมรม</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ร่วมเป็นส่วนหนึ่งในการขับเคลื่อนกิจกรรม</p>
              </div>

              <div className="flex flex-col items-center relative z-10">
                <div className="relative w-[200px] h-[200px] mb-5 p-2 bg-white rounded-xl shadow-md border border-blue-100 dark:border-slate-700">
                  <Image
                    src="/qr-promptpay-mss.jpg"
                    alt="QR พร้อมเพย์"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                
                <div className="w-full space-y-2.5 bg-blue-50/50 dark:bg-slate-800/50 p-4 rounded-xl border border-blue-100/50 dark:border-slate-700/50">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">ชื่อบัญชี</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{CONTACT.accountName}</span>
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 dark:via-slate-600 to-transparent my-1"></div>
                  
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">ธนาคาร</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{CONTACT.bank}</span>
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 dark:via-slate-600 to-transparent my-1"></div>
                  
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">เลขบัญชี</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-blue-700 dark:text-blue-400 tracking-wider">{CONTACT.accountNumber}</span>
                      <button
                        onClick={copyAccountNumber}
                        className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        title="คัดลอกเลขบัญชี"
                      >
                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                {isCopied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-800/90 dark:bg-gray-100/90 backdrop-blur-sm text-white dark:text-gray-900 text-xs px-4 py-2 rounded-full shadow-lg"
                  >
                    คัดลอกเลขบัญชีแล้ว
                  </motion.div>
                )}
                
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-4 text-center">
                  * รองรับสแกนผ่านแอปธนาคารทุกประเภท
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
