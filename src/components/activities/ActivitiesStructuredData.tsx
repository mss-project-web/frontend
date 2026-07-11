"use client";

import { useEffect } from "react";

export default function ActivitiesStructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "กิจกรรมชมรมมุสลิม ม.อ.หาดใหญ่",
      "description": "รวมกิจกรรมต่างๆ ของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ กิจกรรมศาสนาอิสลาม งานเทศกาล และกิจกรรมพัฒนานักศึกษา",
      "url": "https://msspsuhatyai.org/activities",
      "mainEntity": {
        "@type": "ItemList",
        "name": "รายการกิจกรรม",
        "description": "กิจกรรมต่างๆ ของชมรมมุสลิม",
        "itemListElement": [
          {
            "@type": "Event",
            "name": "กิจกรรมศาสนาอิสลาม",
            "description": "กิจกรรมเกี่ยวกับการศึกษาและปฏิบัติศาสนาอิสลาม"
          },
          {
            "@type": "Event", 
            "name": "กิจกรรมเทศกาล",
            "description": "งานเทศกาลสำคัญทางศาสนาอิสลาม เช่น รอมฎอน อีดิ้ลฟิตร์"
          },
          {
            "@type": "Event",
            "name": "กิจกรรมพัฒนานักศึกษา",
            "description": "กิจกรรมเสริมสร้างทักษะและพัฒนาศักยภาพนักศึกษา"
          }
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "ชมรมมุสลิม ม.อ.หาดใหญ่",
        "url": "https://msspsuhatyai.org"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('CollectionPage')) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}
