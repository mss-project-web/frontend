/**
 * Structured Data Component for Homepage
 * Schema.org markup สำหรับหน้าหลัก
 */

export default function HomePageStructuredData() {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ชมรมมุสลิม มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่",
    "alternateName": "MSS Assumption University Hatyai",
    "description": "ชมรมมุสลิม มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่ - สร้างสรรค์ชุมชนมุสลิมที่แข็งแกร่ง ส่งเสริมการเรียนรู้และพัฒนาศักยภาพผ่านกิจกรรมและโครงการต่างๆ",
    "url": "https://mss-hadyai.ac.th",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mss-hadyai.ac.th/LOGO/LOGO-MSS.png",
      "width": 300,
      "height": 300
    },
    "sameAs": [
      "https://www.facebook.com/MSS.Hadyai",
      "https://www.instagram.com/mss_hadyai"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mss-hadyai.ac.th/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ชมรมมุสลิม มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mss-hadyai.ac.th/LOGO/LOGO-MSS.png"
      }
    }
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ชมรมมุสลิม มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่",
    "alternateName": "MSS Assumption University Hatyai",
    "description": "องค์กรนิสิตที่ส่งเสริมการเรียนรู้ทางศาสนาอิสลาม และพัฒนาชุมชนมุสลิมในมหาวิทยาลัย",
    "url": "https://mss-hadyai.ac.th",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mss-hadyai.ac.th/LOGO/LOGO-MSS.png",
      "width": 300,
      "height": 300
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-74-558-800",
      "contactType": "customer service",
      "availableLanguage": ["Thai", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่",
      "addressLocality": "หาดใหญ่",
      "addressRegion": "สงขลา",
      "postalCode": "90110",
      "addressCountry": "TH"
    },
    "sameAs": [
      "https://www.facebook.com/MSS.Hadyai",
      "https://www.instagram.com/mss_hadyai"
    ],
    "memberOf": {
      "@type": "EducationalOrganization",
      "name": "มหาวิทยาลัยอัสสัมชัญ วิทยาเขตหาดใหญ่",
      "url": "https://www.au.edu"
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "หน้าหลัก",
        "item": "https://mss-hadyai.ac.th"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData, null, 2),
        }}
      />
    </>
  );
}
