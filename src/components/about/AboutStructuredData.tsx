"use client";

import { useEffect } from "react";

export default function AboutStructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "alternateName": "ชมรมมุสลิม ม.อ.หาดใหญ่",
        "url": "https://msspsuhatyai.org",
        "description": "ประวัติความเป็นมา วิสัยทัศน์ พันธกิจ และเป้าหมายของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "foundingDate": "1988",
        "location": {
          "@type": "Place",
          "name": "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "หาดใหญ่",
            "addressRegion": "สงขลา",
            "addressCountry": "TH"
          }
        },
        "memberOf": {
          "@type": "Organization",
          "name": "มหาวิทยาลัยสงขลานครินทร์"
        },
        "knowsAbout": [
          "การศึกษาอิสลาม",
          "กิจกรรมนักศึกษามุสลิม",
          "ห้องละหมาด",
          "กิจกรรมศาสนา",
          "ชุมชนมุสลิม"
        ],
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
        if (script.textContent?.includes('AboutPage')) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}
