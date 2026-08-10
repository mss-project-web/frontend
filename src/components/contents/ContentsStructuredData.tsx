/**
 * Structured Data Component for Contents Page
 * Schema.org markup สำหรับหน้าเนื้อหาที่กำลังพัฒนา
 */

import { siteConfig } from "@/config/site";

export default function ContentsStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "เนื้อหาเร็วๆนี้ - ชมรมมุสลิม ม.อ.หาดใหญ่",
    "description": "หน้าเนื้อหาที่กำลังพัฒนา ของชมรมมุสลิม มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่",
    "url": "https://mss-hadyai.ac.th/contents",
    "inLanguage": "th-TH",
    "isPartOf": {
      "@type": "WebSite",
      "name": "ชมรมมุสลิม มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่",
      "url": "https://mss-hadyai.ac.th",
      "publisher": {
        "@type": "Organization",
        "name": "ชมรมมุสลิม มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteConfig.url}${siteConfig.logo}`,
          "width": 300,
          "height": 300
        }
      }
    },
    "mainEntity": {
      "@type": "Thing",
      "name": "หน้าที่กำลังพัฒนา",
      "description": "เนื้อหาและฟีเจอร์ใหม่ๆ ที่กำลังอยู่ในระหว่างการพัฒนา อินชาอัลลอฮฺ"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "หน้าหลัก",
          "item": "https://mss-hadyai.ac.th"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "เนื้อหาเร็วๆนี้",
          "item": "https://mss-hadyai.ac.th/contents"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}
