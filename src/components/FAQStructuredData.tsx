"use client";

import { useEffect } from "react";

interface FAQData {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQData[];
}

export default function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('FAQPage')) {
          script.remove();
        }
      });
    };
  }, [faqs]);

  return null;
}
