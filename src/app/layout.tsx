import type React from "react"
import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import RouteLoader from "@/components/RouteLoader"
import Breadcrumb from "@/components/Breadcrumb"

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["400", "500", "700"],
  variable: "--font-kanit",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://msspsuhatyai.org'),
  title: {
    default: "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    template: "%s | ชมรมมุสลิม ม.อ.หาดใหญ่"
  },
  description: "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ - หวังดีๆ จากบ้านหลังเดิม กิจกรรมสำหรับนักศึกษามุสลิม ห้องละหมาด สถานที่ประกอบศาสนกิจ",
  keywords: [
    "ชมรมมุสลิม",
    "มหาวิทยาลัยสงขลานครินทร์",
    "วิทยาเขตหาดใหญ่",
    "นักศึกษามุสลิม",
    "ห้องละหมาด",
    "กิจกรรมศาสนา",
    "มุสลิมสตูเดนต์",
    "PSU Hatyai",
    "Muslim Student",
    "Prayer Room",
    "Islamic Activities"
  ],
  authors: [{ name: "ชมรมมุสลิม ม.อ.หาดใหญ่" }],
  creator: "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
  publisher: "ชมรมมุสลิม ม.อ.หาดใหญ่",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://msspsuhatyai.org',
    title: 'ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่',
    description: 'ชมรมมุสลิม ม.อ.หาดใหญ่ - หวังดีดี จากบ้านหลังเดิม กิจกรรมสำหรับนักศึกษามุสลิม ห้องละหมาด สถานที่ประกอบศาสนกิจ',
    images: [
      {
        url: '/LOGO/LOGO-MSS.png',
        width: 1200,
        height: 630,
        alt: 'โลโก้ชมรมมุสลิม ม.อ.หาดใหญ่',
      },
    ],
    siteName: 'ชมรมมุสลิม ม.อ.หาดใหญ่',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่',
    description: 'ชมรมมุสลิม ม.อ.หาดใหญ่ - หวังดีดี จากบ้านหลังเดิม',
    images: ['/LOGO/LOGO-MSS.png'],
  },
  alternates: {
    canonical: 'https://msspsuhatyai.org',
    languages: {
      'th-TH': 'https://msspsuhatyai.org',
      'en-US': 'https://msspsuhatyai.org/en',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get API URLs from environment (more secure)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageHost = process.env.NEXT_PUBLIC_IMAGE_HOST;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://msspsuhatyai.org/#organization",
        "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "alternateName": "ชมรมมุสลิม ม.อ.หาดใหญ่",
        "url": "https://msspsuhatyai.org",
        "logo": {
          "@type": "ImageObject",
          "url": "https://msspsuhatyai.org/LOGO/LOGO-MSS.png",
          "width": 512,
          "height": 512
        },
        "description": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ - หวังดีดี จากบ้านหลังเดิม",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          "addressLocality": "หาดใหญ่",
          "addressRegion": "สงขลา",
          "postalCode": "90110",
          "addressCountry": "TH"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["th", "en"]
        },
        "sameAs": [
          "https://www.facebook.com/msspsuhatyai",
          "https://www.instagram.com/msspsuhatyai"
        ],
        "member": {
          "@type": "Organization",
          "name": "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://msspsuhatyai.org/#website",
        "url": "https://msspsuhatyai.org",
        "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "description": "เว็บไซต์ชมรมมุสลิม ม.อ.หาดใหญ่ - ข้อมูลกิจกรรม ห้องละหมาด และข่าวสาร",
        "publisher": {
          "@id": "https://msspsuhatyai.org/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://msspsuhatyai.org/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "th-TH"
      },
      {
        "@type": "WebPage",
        "@id": "https://msspsuhatyai.org/#webpage",
        "url": "https://msspsuhatyai.org",
        "name": "หน้าแรก - ชมรมมุสลิม ม.อ.หาดใหญ่",
        "isPartOf": {
          "@id": "https://msspsuhatyai.org/#website"
        },
        "about": {
          "@id": "https://msspsuhatyai.org/#organization"
        },
        "description": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ - หวังดีๆ จากบ้านหลังเดิม",
        "breadcrumb": {
          "@id": "https://msspsuhatyai.org/#breadcrumb"
        },
        "inLanguage": "th-TH"
      }
    ]
  };

  return (
    <html lang="th" className={kanit.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="application-name" content="ชมรมมุสลิม ม.อ.หาดใหญ่" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ชมรมมุสลิม ม.อ.หาดใหญ่" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Links */}
        <link rel="canonical" href="https://msspsuhatyai.org" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/LOGO/LOGO-MSS.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Preconnect for critical performance only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Conditional preconnect for production */}
        {process.env.NODE_ENV === 'production' && apiUrl && (
          <link rel="dns-prefetch" href={apiUrl} />
        )}
        {process.env.NODE_ENV === 'production' && imageHost && (
          <link rel="dns-prefetch" href={`https://${imageHost}`} />
        )}
      </head>
      <body className="font-sans">
        <RouteLoader />
        <Navigation />
        <Breadcrumb />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
