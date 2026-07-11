"use client"

import { useCookieConsent } from "@/context/cookie-consent-context"
import Script from "next/script"
import { useEffect } from "react"

const GA_MEASUREMENT_ID = "G-K6W2JEG3L9"

export function GoogleAnalytics() {
    const { consent } = useCookieConsent()

    useEffect(() => {
        // If consent is granted for analytics, update the config
        if (consent.analytics) {
            window.gtag("consent", "update", {
                analytics_storage: "granted",
            })
        } else {
            // Default state is denied
            window.gtag("consent", "default", {
                analytics_storage: "denied",
            })
        }
    }, [consent.analytics])

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Default consent to denied
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'security_storage': 'granted',
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    )
}
