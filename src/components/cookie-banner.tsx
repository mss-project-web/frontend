"use client"

import Link from "next/link"
import { useState } from "react"
import { useCookieConsent } from "@/context/cookie-consent-context"
import { CookieSettingsModal } from "./cookie-settings-modal"
import { Button } from "./ui/button"
import { Cookie } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieBanner() {
    const { isOpen, acceptAll, rejectAll, saveConsent } = useCookieConsent()
    const [showSettings, setShowSettings] = useState(false)

    // Don't render anything if the banner shouldn't be open
    if (!isOpen) return null

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                    >
                        <div className="mx-auto max-w-7xl rounded-2xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl md:flex md:items-center md:justify-between md:gap-8 dark:bg-black/80 dark:border-white/10">
                            <div className="flex items-start gap-4 md:items-center">
                                <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    <Cookie className="h-6 w-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Cookie className="h-5 w-5 md:hidden text-blue-600" />
                                        เว็บไซต์นี้ใช้คุกกี้
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                                        เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีในการใช้งานเว็บไซต์
                                        คุณสามารถเลือกตั้งค่าความยินยอมการใช้คุกกี้ได้ โดยคลิก "การตั้งค่าคุกกี้"
                                        <Link href="/privacy" className="text-blue-500 hover:text-blue-600 underline ml-1">
                                            อ่านนโยบายความเป็นส่วนตัว
                                        </Link>
                                        <br className="hidden md:block" />
                                        <span className="text-xs text-gray-400 mt-1 block">
                                            ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-3 md:mt-0 md:flex-row md:items-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSettings(true)}
                                    className="w-full md:w-auto border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    ตั้งค่าคุกกี้
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={rejectAll}
                                    className="w-full md:w-auto bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                >
                                    ปฏิเสธทั้งหมด
                                </Button>
                                <Button
                                    onClick={acceptAll}
                                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/30 transition-all duration-300"
                                >
                                    ยอมรับทั้งหมด
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CookieSettingsModal
                isOpen={showSettings}
                onOpenChange={setShowSettings}
                onSave={(preferences) => saveConsent({ ...preferences, essential: true })}
            />
        </>
    )
}
