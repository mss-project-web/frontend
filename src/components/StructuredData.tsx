import { WithContext, WebSite, Organization, BreadcrumbList, Article, Event } from 'schema-dts';
import { siteConfig } from "@/config/site";

interface StructuredDataProps {
  type: 'website' | 'organization' | 'breadcrumb' | 'article' | 'event';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: any = {};

  switch (type) {
    case 'website':
      const websiteData: WithContext<WebSite> = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "alternateName": "ชมรมมุสลิม ม.อ.หาดใหญ่",
        "url": "https://msspsuhatyai.org",
        "description": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ - หวังดีดี จากบ้านหลังเดิม กิจกรรมสำหรับนักศึกษามุสลิม ห้องละหมาด สถานที่ประกอบศาสนกิจ",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://msspsuhatyai.org/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        } as any,
        "sameAs": [
          "https://www.facebook.com/msspsuhatyai",
          "https://www.instagram.com/msspsuhatyai",
          "https://twitter.com/msspsuhatyai"
        ]
      };
      structuredData = websiteData;
      break;

    case 'organization':
      const orgData: WithContext<Organization> = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
        "alternateName": ["ชมรมมุสลิม ม.อ.หาดใหญ่", "MSS PSU Hatyai"] as any,
        "url": "https://msspsuhatyai.org",
        "logo": `${siteConfig.url}${siteConfig.logo}`,
        "description": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ - หวังดีดี จากบ้านหลังเดิม กิจกรรมสำหรับนักศึกษามุสลิม ห้องละหมาด สถานที่ประกอบศาสนกิจ",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+66-XX-XXX-XXXX",
          "contactType": "customer service",
          "availableLanguage": ["Thai", "English"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "หาดใหญ่",
          "addressRegion": "สงขลา",
          "addressCountry": "TH"
        },
        "sameAs": [
          "https://www.facebook.com/msspsuhatyai",
          "https://www.instagram.com/msspsuhatyai"
        ],
        "knowsAbout": [
          "การศึกษาอิสลาม",
          "กิจกรรมนักศึกษามุสลิม",
          "ห้องละหมาด",
          "กิจกรรมศาสนา"
        ]
      };
      structuredData = orgData;
      break;

    case 'breadcrumb':
      if (data) {
        const breadcrumbData: WithContext<BreadcrumbList> = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };
        structuredData = breadcrumbData;
      }
      break;

    case 'article':
      if (data) {
        const articleData: WithContext<Article> = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Organization",
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่",
            "logo": {
              "@type": "ImageObject",
              "url": `${siteConfig.url}${siteConfig.logo}`
            }
          },
          "datePublished": data.datePublished,
          "dateModified": data.dateModified || data.datePublished
        };
        structuredData = articleData;
      }
      break;

    case 'event':
      if (data) {
        const eventData: WithContext<Event> = {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": data.name,
          "description": data.description,
          "startDate": data.startDate,
          "endDate": data.endDate,
          "location": {
            "@type": "Place",
            "name": data.location?.name || "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "หาดใหญ่",
              "addressRegion": "สงขลา",
              "addressCountry": "TH"
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": "ชมรมมุสลิม ม.อ.หาดใหญ่",
            "url": "https://msspsuhatyai.org"
          },
          "image": data.image
        };
        structuredData = eventData;
      }
      break;
  }

  // Next.js standard way to inject JSON-LD for SEO without useEffect
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
