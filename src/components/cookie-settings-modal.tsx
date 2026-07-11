"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useCookieConsent } from "@/context/cookie-consent-context"
import { ShieldCheck, BarChart3, Megaphone, Lock, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export function CookieSettingsModal({
    isOpen,
    onOpenChange,
    onSave
}: {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSave: (preferences: { analytics: boolean; marketing: boolean }) => void
}) {
    const { consent } = useCookieConsent()
    const [preferences, setPreferences] = useState({
        analytics: consent.analytics,
        marketing: consent.marketing
    })

    // Sync state when modal opens
    useEffect(() => {
        if (isOpen) {
            setPreferences({
                analytics: consent.analytics,
                marketing: consent.marketing
            })
        }
    }, [isOpen, consent])

    const handleSave = () => {
        onSave(preferences)
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] border-white/20 bg-white/90 backdrop-blur-2xl shadow-2xl p-0 overflow-hidden gap-0 dark:bg-gray-900/90 dark:border-white/10">
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-blue-200" />
                        การตั้งค่าคุกกี้
                    </DialogTitle>
                    <DialogDescription className="text-blue-100 mt-2 text-base">
                        เราใช้คุกกี้เพื่อเพิ่มประสบการณ์ที่ดีในการใช้งานเว็บไซต์ คุณสามารถปรับแต่งการตั้งค่าความเป็นส่วนตัวได้ด้านล่าง
                    </DialogDescription>
                </div>

                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto bg-gray-50/50 dark:bg-transparent">
                    {/* Privacy Policy Link */}
                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl mb-4 dark:bg-blue-900/20 dark:border-blue-800">
                        <div className="text-sm text-blue-900 dark:text-blue-100">
                            <strong>ต้องการข้อมูลเพิ่มเติม?</strong> อ่านรายละเอียดเกี่ยวกับวิธีการเก็บรวบรวมและใช้ข้อมูลของคุณ
                        </div>
                        <Link
                            href="/privacy"
                            target="_blank"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 whitespace-nowrap dark:text-blue-400"
                        >
                            นโยบายความเป็นส่วนตัว <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Essential Cookies - Always On */}
                    <div className="group flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-3 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                            <Lock className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="essential" className="text-base font-bold text-gray-900 dark:text-white">
                                    คุกกี้ที่จำเป็น (Strictly Necessary)
                                </Label>
                                <Switch id="essential" checked disabled aria-label="Essential Cookies Always On" />
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed dark:text-gray-400">
                                จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้
                            </p>
                        </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className={cn(
                        "group flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md",
                        preferences.analytics
                            ? "bg-indigo-50/50 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-800"
                            : "bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                    )}>
                        <div className={cn(
                            "p-3 rounded-full transition-colors",
                            preferences.analytics
                                ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400"
                                : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        )}>
                            <BarChart3 className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="analytics" className="text-base font-bold text-gray-900 dark:text-white cursor-pointer">
                                    คุกกี้เพื่อการวิเคราะห์ (Analytics)
                                </Label>
                                <Switch
                                    id="analytics"
                                    checked={preferences.analytics}
                                    onCheckedChange={(checked) =>
                                        setPreferences((prev) => ({ ...prev, analytics: checked }))
                                    }
                                />
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed dark:text-gray-400">
                                ช่วยให้เราเข้าใจพฤติกรรมการใช้งานเพื่อปรับปรุงเว็บไซต์ให้ดียิ่งขึ้น (Google Analytics)
                            </p>
                        </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className={cn(
                        "group flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md",
                        preferences.marketing
                            ? "bg-rose-50/50 border-rose-100 dark:bg-rose-900/10 dark:border-rose-800"
                            : "bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                    )}>
                        <div className={cn(
                            "p-3 rounded-full transition-colors",
                            preferences.marketing
                                ? "bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-400"
                                : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        )}>
                            <Megaphone className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="marketing" className="text-base font-bold text-gray-900 dark:text-white cursor-pointer">
                                    คุกกี้เพื่อการตลาด (Marketing)
                                </Label>
                                <Switch
                                    id="marketing"
                                    checked={preferences.marketing}
                                    onCheckedChange={(checked) =>
                                        setPreferences((prev) => ({ ...prev, marketing: checked }))
                                    }
                                />
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed dark:text-gray-400">
                                ใช้เพื่อนำเสนอเนื้อหาที่เหมาะสมกับความสนใจของคุณ (ยังไม่เปิดใช้งานในขณะนี้)
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="bg-gray-50/80 p-6 border-t border-gray-100 dark:bg-gray-900/80 dark:border-gray-800 backdrop-blur-sm">
                    <div className="flex w-full flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="w-full sm:w-1/3 border-gray-200 hover:bg-gray-50 text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="w-full sm:w-2/3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20"
                        >
                            บันทึกการตั้งค่า
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
