"use client"

import { useState } from "react"
import { Cookie } from "lucide-react"
import { CookieSettingsModal } from "./cookie-settings-modal"
import { useCookieConsent } from "@/context/cookie-consent-context"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieFloatingButton() {
    const { saveConsent, isOpen } = useCookieConsent()
    const [showSettings, setShowSettings] = useState(false)

    // Hide floating button when the main banner is open
    if (isOpen) return null

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-4 left-4 z-50"
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowSettings(true)}
                            className="h-12 w-12 rounded-full border-2 border-blue-600 bg-white shadow-xl hover:bg-blue-50 hover:scale-110 transition-transform duration-200 dark:bg-gray-800 dark:border-blue-400"
                            title="การตั้งค่าคุกกี้"
                        >
                            <Cookie className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            <span className="sr-only">การตั้งค่าคุกกี้</span>
                        </Button>
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
