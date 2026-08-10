"use client"

import Link from "next/link"
import { useState } from "react"
import { useCookieConsent } from "@/context/cookie-consent-context"
import { CookieSettingsModal } from "./cookie-settings-modal"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieBanner() {
    const { isOpen, acceptAll, rejectAll, saveConsent } = useCookieConsent()
    const [showSettings, setShowSettings] = useState(false)

    return (
        <>
            <AnimatePresence>
                {isOpen && !showSettings && (
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1000px] z-[200] rounded-2xl shadow-[0_2px_5px_rgba(37,99,235,0.45)]"
                        role="dialog"
                        aria-label="Cookie consent"
                        aria-modal="false"
                    >
                        <div className="bg-white rounded-xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-4 sm:p-5 lg:p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
                                
                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                                        เราใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งาน
                                    </h3>
                                    <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
                                        ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ ใช้คุกกี้และเทคโนโลยีที่คล้ายคลึงกันเพื่อวิเคราะห์การใช้งานและปรับปรุงบริการ คุณสามารถยอมรับหรือปฏิเสธได้ตามต้องการ โดยสามารถศึกษารายละเอียดเพิ่มเติมที่
                                        <Link href="/privacy" className="text-blue-700 font-semibold hover:text-blue-800 hover:underline transition-all ml-1">
                                            นโยบายความเป็นส่วนตัว
                                        </Link>
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="cursor-pointer flex-1 sm:flex-none min-w-[120px] rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-neutral-700 transition-all hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                                    >
                                        ตั้งค่าคุกกี้
                                    </button>
                                    <button
                                        onClick={rejectAll}
                                        className="cursor-pointer flex-1 sm:flex-none min-w-[120px] rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-neutral-700 transition-all hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                                    >
                                        ปฏิเสธ
                                    </button>
                                    <button
                                        onClick={acceptAll}
                                        className="cursor-pointer flex-1 sm:flex-none w-full sm:w-auto min-w-[120px] rounded-lg bg-blue-900 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
                                    >
                                        ยอมรับทั้งหมด
                                    </button>
                                </div>

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
