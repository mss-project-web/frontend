"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useCookieConsent } from "@/context/cookie-consent-context"
import { ShieldCheck, BarChart3, Megaphone, Lock, Info, ExternalLink } from "lucide-react"
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
            {/* 
              We use a clean wrapper, rounded nicely, with no heavy borders.
              max-sm:!bottom-0 makes it act like a bottom sheet on mobile smoothly.
            */}
            <DialogContent className="max-sm:!top-auto max-sm:!bottom-0 max-sm:!translate-y-0 max-sm:!translate-x-0 max-sm:!left-0 max-sm:w-full max-sm:!rounded-b-none max-sm:!rounded-t-[1.5rem] max-sm:data-[state=open]:!slide-in-from-bottom-full max-sm:data-[state=closed]:!slide-out-to-bottom-full max-sm:!zoom-in-100 max-sm:!zoom-out-100 sm:max-w-[640px] w-full p-0 overflow-hidden gap-0 sm:rounded-2xl bg-slate-50 border-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                
                {/* Header */}
                <div className="px-6 pt-8 pb-5 bg-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                                <ShieldCheck className="h-7 w-7 text-blue-600" />
                                การตั้งค่าความเป็นส่วนตัว
                            </DialogTitle>
                            <p className="text-slate-500 text-[15px] leading-relaxed mt-2.5 max-w-[90%]">
                                เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ คุณสามารถเลือกเปิดหรือปิดการใช้งานคุกกี้แต่ละประเภทได้ตามความต้องการ
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="px-4 sm:px-6 py-5 space-y-4 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
                    
                    {/* Privacy Policy Callout */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50/60 border border-blue-100/80 rounded-2xl">
                        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-1">
                            <p className="text-[14px] text-blue-900 leading-relaxed">
                                ต้องการทราบข้อมูลเพิ่มเติมเกี่ยวกับวิธีการที่เราจัดเก็บและประมวลผลข้อมูลของคุณหรือไม่?
                            </p>
                            <Link
                                href="/privacy"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                            >
                                อ่านนโยบายความเป็นส่วนตัว <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* Essential Cookies */}
                        <div className="flex items-start justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 pt-0.5">
                                    <Label className="text-[14px] sm:text-[15px] font-semibold text-slate-900 cursor-default">
                                        คุกกี้ที่จำเป็น (Strictly Necessary)
                                    </Label>
                                    <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed pr-2 sm:pr-4">
                                        คุกกี้เหล่านี้มีความสำคัญอย่างยิ่งต่อการทำงานของเว็บไซต์ และไม่สามารถปิดการใช้งานในระบบของเราได้
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0 mt-0.5 sm:mt-2">
                                <Switch checked disabled className="data-[state=checked]:bg-slate-300 opacity-60" aria-label="Essential Cookies Always On" />
                            </div>
                        </div>

                        {/* Analytics Cookies */}
                        <div className={cn(
                            "flex items-start justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200",
                            preferences.analytics ? "border-blue-200 bg-blue-50/30 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                        )}>
                            <div className="flex gap-3 sm:gap-4">
                                <div className={cn(
                                    "flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full transition-colors",
                                    preferences.analytics ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                                )}>
                                    <BarChart3 className="h-5 w-5" />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 pt-0.5">
                                    <Label htmlFor="analytics" className="text-[14px] sm:text-[15px] font-semibold text-slate-900 cursor-pointer">
                                        คุกกี้เพื่อการวิเคราะห์ (Analytics)
                                    </Label>
                                    <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed pr-2 sm:pr-4">
                                        ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมใช้งานเว็บไซต์อย่างไร เพื่อนำข้อมูลไปวิเคราะห์และปรับปรุงประสิทธิภาพให้ดียิ่งขึ้น
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0 mt-0.5 sm:mt-2">
                                <Switch
                                    id="analytics"
                                    checked={preferences.analytics}
                                    onCheckedChange={(checked) =>
                                        setPreferences((prev) => ({ ...prev, analytics: checked }))
                                    }
                                />
                            </div>
                        </div>

                        {/* Marketing Cookies */}
                        <div className={cn(
                            "flex items-start justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-200",
                            preferences.marketing ? "border-blue-200 bg-blue-50/30 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
                        )}>
                            <div className="flex gap-3 sm:gap-4">
                                <div className={cn(
                                    "flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full transition-colors",
                                    preferences.marketing ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                                )}>
                                    <Megaphone className="h-5 w-5" />
                                </div>
                                <div className="space-y-1 sm:space-y-1.5 pt-0.5">
                                    <Label htmlFor="marketing" className="text-[14px] sm:text-[15px] font-semibold text-slate-900 cursor-pointer">
                                        คุกกี้เพื่อการตลาด (Marketing)
                                    </Label>
                                    <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed pr-2 sm:pr-4">
                                        ใช้สำหรับติดตามผู้เยี่ยมชมข้ามเว็บไซต์ต่างๆ เพื่อแสดงโฆษณาที่เกี่ยวข้องและน่าสนใจสำหรับผู้ใช้แต่ละราย
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0 mt-0.5 sm:mt-2">
                                <Switch
                                    id="marketing"
                                    checked={preferences.marketing}
                                    onCheckedChange={(checked) =>
                                        setPreferences((prev) => ({ ...prev, marketing: checked }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3 rounded-b-2xl">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="w-full sm:w-auto font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl px-6"
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="w-full sm:w-auto font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-8 shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30"
                    >
                        บันทึกการตั้งค่า
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
