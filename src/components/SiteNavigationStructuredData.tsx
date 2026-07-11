"use client";

import { useEffect } from "react";

export default function SiteNavigationStructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
      "url": "https://msspsuhatyai.org",
      "hasPart": [
        {
          "@type": "WebPageElement",
          "isPartOf": {
            "@type": "WebSite",
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่"
          },
          "name": "หน้าแรก",
          "description": "หน้าหลักของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          "url": "https://msspsuhatyai.org"
        },
        {
          "@type": "WebPageElement",
          "isPartOf": {
            "@type": "WebSite", 
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่"
          },
          "name": "เกี่ยวกับเรา",
          "description": "ประวัติและข้อมูลเกี่ยวกับชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          "url": "https://msspsuhatyai.org/about"
        },
        {
          "@type": "WebPageElement",
          "isPartOf": {
            "@type": "WebSite",
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่"
          },
          "name": "กิจกรรม",
          "description": "กิจกรรมและโครงการต่างๆ ของชมรมมุสลิม",
          "url": "https://msspsuhatyai.org/activities"
        },
        {
          "@type": "WebPageElement",
          "isPartOf": {
            "@type": "WebSite",
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่"
          },
          "name": "ห้องละหมาด",
          "description": "ข้อมูลห้องละหมาดในมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          "url": "https://msspsuhatyai.org/prayer-rooms"
        },
        {
          "@type": "WebPageElement",
          "isPartOf": {
            "@type": "WebSite",
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่"
          },
          "name": "ข่าวสาร",
          "description": "ข่าวสารและประกาศต่างๆ จากชมรมมุสลิม",
          "url": "https://msspsuhatyai.org/news"
        },
        {
          "@type": "WebPageElement",
          "isPartOf": {
            "@type": "WebSite",
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่"
          },
          "name": "ติดต่อเรา",
          "description": "ข้อมูลการติดต่อชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          "url": "https://msspsuhatyai.org/contact"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('hasPart')) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}
