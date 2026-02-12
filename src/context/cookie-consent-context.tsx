"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Consent = {
    essential: boolean
    analytics: boolean
    marketing: boolean
}

type CookieConsentContextType = {
    consent: Consent
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    saveConsent: (consent: Consent) => void
    acceptAll: () => void
    rejectAll: () => void
    hasConsented: boolean
}

const defaultConsent: Consent = {
    essential: true,
    analytics: false,
    marketing: false,
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsent] = useState<Consent>(defaultConsent)
    const [isOpen, setIsOpen] = useState(false)
    const [hasConsented, setHasConsented] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const storedConsent = localStorage.getItem("cookie-consent")
        if (storedConsent) {
            try {
                const parsed = JSON.parse(storedConsent)
                setConsent({ ...defaultConsent, ...parsed })
                setHasConsented(true)
                setIsOpen(false)
            } catch (e) {
                // If parsing fails, reset
                setIsOpen(true)
            }
        } else {
            setIsOpen(true)
        }
    }, [])

    const saveConsent = (newConsent: Consent) => {
        const finalConsent = { ...newConsent, essential: true } // Ensure essential is always true
        setConsent(finalConsent)
        setHasConsented(true)
        setIsOpen(false)
        localStorage.setItem("cookie-consent", JSON.stringify(finalConsent))
    }

    const acceptAll = () => {
        saveConsent({
            essential: true,
            analytics: true,
            marketing: true,
        })
    }

    const rejectAll = () => {
        saveConsent({
            essential: true,
            analytics: false,
            marketing: false,
        })
    }

    if (!isClient) {
        return null
    }

    return (
        <CookieConsentContext.Provider
            value={{
                consent,
                isOpen,
                setIsOpen,
                saveConsent,
                acceptAll,
                rejectAll,
                hasConsented,
            }}
        >
            {children}
        </CookieConsentContext.Provider>
    )
}

export function useCookieConsent() {
    const context = useContext(CookieConsentContext)
    if (context === undefined) {
        throw new Error("useCookieConsent must be used within a CookieConsentProvider")
    }
    return context
}
