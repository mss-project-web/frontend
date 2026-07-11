"use client";

import { useEffect } from "react";

export default function NewsStructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "ข่าวสารชมรมมุสลิม ม.อ.หาดใหญ่",
      "description": "ข่าวสารและประชาสัมพันธ์จากชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ ข่าวกิจกรรม ประกาศสำคัญ และอัพเดทล่าสุด",
      "url": "https://msspsuhatyai.org/news",
      "mainEntity": {
        "@type": "ItemList",
        "name": "รายการข่าวสาร",
        "description": "ข่าวสารและประชาสัมพันธ์จากชมรมมุสลิม",
        "itemListElement": [
          {
            "@type": "Article",
            "name": "ข่าวกิจกรรม",
            "description": "ข่าวสารเกี่ยวกับกิจกรรมต่างๆ ของชมรม"
          },
          {
            "@type": "Article",
            "name": "ประกาศสำคัญ", 
            "description": "ประกาศและข้อมูลสำคัญจากชมรม"
          },
          {
            "@type": "Article",
            "name": "อัพเดทล่าสุด",
            "description": "ข่าวสารและความเคลื่อนไหวล่าสุด"
          }
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "ชมรมมุสลิม ม.อ.หาดใหญ่",
        "url": "https://msspsuhatyai.org",
        "logo": {
          "@type": "ImageObject",
          "url": "https://msspsuhatyai.org/LOGO/LOGO-MSS.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://msspsuhatyai.org/news?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('ข่าวสารชมรมมุสลิม')) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}
