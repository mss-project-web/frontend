"use client";



export default function AboutStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "alternateName": [
          "ชมรมมุสลิม ม.อ.หาดใหญ่",
          "MSSPSUHATYAI",
          "MSS PSU HATYAI",
          "Muslim Student Society PSU HATYAI",
          "Muslim Student Club of Prince of Songkla University, Hat Yai Campus"
        ],
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
