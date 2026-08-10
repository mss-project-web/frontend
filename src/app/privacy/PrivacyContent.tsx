"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Mail, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const privacyData = {
  title: "นโยบายความเป็นส่วนตัว",
  lastUpdated: "10 สิงหาคม 2567",
  intro1:
    'ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ ("เรา", "พวกเรา", หรือ "ของเรา") ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคล นโยบายนี้อธิบายวิธีการที่เราเก็บรวบรวม ใช้งาน เปิดเผย และปกป้องข้อมูลส่วนบุคคลของคุณ เมื่อคุณใช้บริการเว็บไซต์ของเรา',
  intro2:
    "การเข้าถึงและใช้งานเว็บไซต์ของเรา ถือว่าท่านได้อ่าน ทำความเข้าใจ และยอมรับข้อผูกพันตามนโยบายความเป็นส่วนตัวฉบับนี้",
  backToHome: "กลับสู่หน้าหลัก",
  sections: [
    {
      id: "data-collection",
      title: "1. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม",
      content:
        "เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน เท่าที่จำเป็นสำหรับการติดต่อประสานงานและการให้บริการ ดังนี้:",
      list: [
        "ข้อมูลระบุตัวตน เช่น ชื่อ, นามสกุล (กรณีท่านติดต่อเรา)",
        "ข้อมูลการติดต่อ เช่น อีเมล, หมายเลขโทรศัพท์",
        "ข้อมูลทางเทคนิค เช่น IP Address, Cookie ID, ประวัติการใช้งานเว็บไซต์ (ผ่าน Google Analytics)",
      ],
    },
    {
      id: "purpose",
      title: "2. วัตถุประสงค์การเก็บรวบรวมข้อมูล",
      content:
        "ข้อมูลทั้งหมดที่ได้รับการรวบรวมจะถูกนำมาใช้เพื่อวัตถุประสงค์ดังต่อไปนี้:",
      list: [
        "วิเคราะห์และปรับปรุงประสิทธิภาพของเว็บไซต์และบริการของเรา",
        "ติดต่อสื่อสารและตอบกลับข้อซักถามของท่าน",
        "ปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้อง",
      ],
    },
    {
      id: "cookies",
      title: "3. คุกกี้ (Cookies)",
      content:
        "เว็บไซต์ของเรามีการใช้คุกกี้เพื่อเพิ่มประสบการณ์การใช้งานของท่าน และวิเคราะห์พฤติกรรมการใช้งาน คุกกี้ที่ใช้แบ่งออกเป็น:",
      list: [
        "คุกกี้จำเป็น (Strictly Necessary) — จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้",
        "คุกกี้เพื่อการวิเคราะห์ (Analytics) — ช่วยให้เราเข้าใจพฤติกรรมการใช้งานเว็บไซต์ผ่าน Google Analytics",
      ],
    },
    {
      id: "disclosure",
      title: "4. การเปิดเผยข้อมูล",
      content:
        "เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านต่อบุคคลภายนอก เว้นแต่จะได้รับความยินยอมจากท่าน หรือเป็นการปฏิบัติตามคำสั่งของเจ้าหน้าที่รัฐหรือตามที่กฎหมายกำหนด",
    },
    {
      id: "rights",
      title: "5. สิทธิของท่านตามกฎหมาย PDPA",
      content:
        "ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) ท่านมีสิทธิ์ดำเนินการดังต่อไปนี้:",
      list: [
        "ขอเข้าถึงข้อมูล และขอรับสำเนาข้อมูลส่วนบุคคล",
        "ขอแก้ไขข้อมูลให้มีความถูกต้อง",
        "ขอลบข้อมูล หรือขอระงับการใช้ข้อมูล",
        "ขอโอนย้ายข้อมูล",
        "คัดค้านการประมวลผลข้อมูล",
      ],
    },
    {
      id: "contact",
      title: "6. ติดต่อเรา",
      content:
        "หากท่านมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ สามารถติดต่อเราได้ที่",
    },
  ],
};

export default function PrivacyContent() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);

          document.querySelectorAll(".toc-link").forEach((link) => {
            link.classList.remove("text-blue-700", "bg-blue-50", "font-bold");
            link.classList.add("text-neutral-500", "font-medium");
          });

          if (activeLink) {
            activeLink.classList.remove("text-neutral-500", "font-medium");
            activeLink.classList.add(
              "text-blue-700",
              "bg-blue-50",
              "font-bold",
            );
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll("div[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 110;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <div className="bg-white font-sans text-neutral-900 pb-20">
      {/* HEADER */}
      <section className="pt-32 pb-10 lg:pt-40 lg:pb-12 border-b border-neutral-100">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            {privacyData.title}
          </h1>
          <p className="text-neutral-500 text-lg">
            Privacy Policy • ปรับปรุงล่าสุด: {privacyData.lastUpdated}
          </p>
        </div>
      </section>

      {/* CONTENT & SIDEBAR */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* SIDEBAR NAV */}
            <aside className="lg:w-1/4 shrink-0">
              <div className="sticky top-28">
                <nav className="space-y-1" id="toc-nav">
                  {privacyData.sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => handleScroll(e, s.id)}
                      className="toc-link block px-4 py-2.5 text-sm font-medium text-neutral-500 hover:text-blue-700 hover:bg-blue-50/50 rounded-xl transition-all duration-200"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="lg:w-3/4 max-w-3xl">
              <div className="text-lg text-neutral-600 leading-relaxed space-y-6">
                <p>{privacyData.intro1}</p>
                <p>{privacyData.intro2}</p>
              </div>

              <div className="mt-12 space-y-12">
                {privacyData.sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">
                      {s.title}
                    </h2>
                    <p className="text-neutral-600 leading-relaxed mb-4">
                      {s.content}
                    </p>

                    {s.list && (
                      <ul className="space-y-3 mt-2">
                        {s.list.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-neutral-600"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 mt-0.5">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Contact Box */}
                    {s.id === "contact" && (
                      <div className="mt-6 p-6 sm:p-8 bg-blue-50/50 rounded-[1.5rem] border border-blue-100">
                        <p className="font-bold text-neutral-900 mb-4">
                          ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่
                          (ผู้ควบคุมข้อมูล)
                        </p>
                        <div className="space-y-3 text-neutral-600 text-sm sm:text-base">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                            <span>
                              15 ถนนกาญจนวณิชย์ ตำบลคอหงส์ อำเภอหาดใหญ่
                              จังหวัดสงขลา 90110
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-700 shrink-0" />
                            <a
                              href={`mailto:${CONTACT.email}`}
                              className="hover:text-blue-700 font-medium transition-colors"
                            >
                              {CONTACT.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Back link */}
              <div className="mt-16 pt-8 border-t border-neutral-100">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-neutral-500 hover:text-blue-700 font-medium transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" /> {privacyData.backToHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
