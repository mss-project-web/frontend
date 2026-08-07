"use client";

import { useEffect } from "react";

export default function ContactStructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "ติดต่อชมรมมุสลิม ม.อ.หาดใหญ่",
      "description": "ช่องทางการติดต่อและสอบถามข้อมูลจากชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
      "url": "https://msspsuhatyai.org/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "alternateName": "ชมรมมุสลิม ม.อ.หาดใหญ่",
        "url": "https://msspsuhatyai.org",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "name": "ติดต่อทั่วไป",
            "availableLanguage": ["Thai", "English"],
            "areaServed": "TH"
          },
          {
            "@type": "ContactPoint", 
            "contactType": "social media",
            "name": "Social Media",
            "url": "https://www.facebook.com/msspsuhatyai"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          "addressLocality": "หาดใหญ่",
          "addressRegion": "สงขลา", 
          "postalCode": "90110",
          "addressCountry": "TH"
        },
        "sameAs": [
          "https://www.facebook.com/msspsuhatyai",
          "https://www.instagram.com/msspsuhatyai"
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('ContactPage')) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}
