"use client"

import { useCookieConsent } from "@/context/cookie-consent-context"

type EventParams = {
    category?: string
    label?: string
    value?: number
    [key: string]: any
}

export function useClickTracking() {
    const { consent } = useCookieConsent()

    const trackEvent = (eventName: string, params?: EventParams) => {
        if (consent.analytics && typeof window !== "undefined" && window.gtag) {
            window.gtag("event", eventName, params)
        } else {
            console.log(`[Tracking Skipped] Event: ${eventName}`, params)
        }
    }

    return { trackEvent }
}
