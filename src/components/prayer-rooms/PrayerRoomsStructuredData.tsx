"use client";

import { useEffect } from "react";

export default function PrayerRoomsStructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": "ห้องละหมาด มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
      "alternateName": "Prayer Rooms PSU Hatyai",
      "description": "ห้องละหมาดและสถานที่ประกอบศาสนกิจสำหรับชุมชนมุสลิมใน มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
      "url": "https://msspsuhatyai.org/prayer-rooms",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "addressLocality": "หาดใหญ่", 
        "addressRegion": "สงขลา",
        "postalCode": "90110",
        "addressCountry": "TH"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "7.0061",
        "longitude": "100.4925"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "ห้องละหมาด",
          "value": "สถานที่สำหรับประกอบศาสนกิจ"
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "เวลาละหมาด",
          "value": "ข้อมูลเวลาละหมาดประจำวัน"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "ทิศกิบลัต",
          "value": "ทิศทางสำหรับการละหมาด"
        }
      ],
      "isAccessibleForFree": true,
      "publicAccess": true,
      "containedInPlace": {
        "@type": "University",
        "name": "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"@type": "Place"')) {
          script.remove();
        }
      });
    };
  }, []);

  return null;
}
