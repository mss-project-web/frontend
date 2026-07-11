export default function GoogleVerification() {
  return (
    <head>
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      
      {/* Additional SEO meta tags */}
      <meta name="geo.region" content="TH-83" />
      <meta name="geo.placename" content="Hat Yai, Songkhla" />
      <meta name="geo.position" content="7.0061;100.4925" />
      <meta name="ICBM" content="7.0061, 100.4925" />
      
      {/* Schema.org for Local Business */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
            "alternateName": "MSS PSU Hatyai",
            "url": "https://msspsuhatyai.org",
            "logo": "https://msspsuhatyai.org/LOGO/LOGO-MSS.png",
            "description": "ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ - หวังดีดี จากบ้านหลังเดิม",
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
            "sameAs": [
              "https://www.facebook.com/msspsuhatyai",
              "https://www.instagram.com/msspsuhatyai"
            ],
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://msspsuhatyai.org/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </head>
  );
}
