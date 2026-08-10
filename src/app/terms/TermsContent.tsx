"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const termsData = {
  title: "เงื่อนไขการให้บริการ",
  lastUpdated: "10 สิงหาคม 2567",
  intro1: "ยินดีต้อนรับสู่เว็บไซต์ ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ (MSS PSU Hatyai) ข้อตกลงฉบับนี้มีผลผูกพันทางกฎหมายระหว่างผู้ใช้บริการกับทางชมรม เพื่อประโยชน์ในการใช้งานเว็บไซต์อย่างถูกต้องและเป็นธรรม",
  intro2: "การเข้าถึงและใช้งานเว็บไซต์ของเรา ถือว่าท่านได้อ่าน ทำความเข้าใจ และยอมรับข้อผูกพันตามเงื่อนไขการให้บริการนี้ทุกประการ",
  backToHome: "กลับสู่หน้าหลัก",
  sections: [
    {
      id: "acceptance",
      title: "1. การยอมรับเงื่อนไข",
      content: "การเข้าถึงและใช้งานเว็บไซต์ของ ชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ (MSS PSU Hatyai) ถือว่าท่านได้อ่าน ทำความเข้าใจ และยอมรับข้อผูกพันตามเงื่อนไขการให้บริการนี้ทุกประการ หากท่านไม่เห็นด้วยกับข้อกำหนดเหล่านี้ กรุณางดเว้นการใช้งานเว็บไซต์ของเรา"
    },
    {
      id: "user-conduct",
      title: "2. การใช้งานเว็บไซต์",
      content: "ผู้ใช้งานตกลงที่จะใช้เว็บไซต์นี้เพื่อวัตถุประสงค์ที่ชอบด้วยกฎหมายเท่านั้น และจะไม่กระทำการดังต่อไปนี้:",
      list: [
        "ละเมิดสิทธิส่วนบุคคล หรือสิทธิในทรัพย์สินทางปัญญาของผู้อื่น",
        "นำเข้า เผยแพร่ หรือส่งต่อเนื้อหาที่ผิดกฎหมาย ลามกอนาจาร หรือสร้างความแตกแยก",
        "พยายามเจาะระบบ (Hack) หรือกระทำการใดๆ ที่อาจก่อให้เกิดความเสียหายแก่ระบบเซิร์ฟเวอร์และเครือข่าย",
        "ใช้เว็บไซต์เพื่อวัตถุประสงค์ในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร"
      ]
    },
    {
      id: "intellectual-property",
      title: "3. ทรัพย์สินทางปัญญา",
      content: "เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงแต่ไม่จำกัดเพียง ข้อความ, รูปภาพ, กราฟิก, โลโก้, วิดีโอ และโค้ด ถือเป็นทรัพย์สินทางปัญญาของชมรมมุสลิม มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ หรือผู้ให้อนุญาตที่เกี่ยวข้อง ห้ามมิให้ผู้ใดคัดลอก ดัดแปลง หรือนำไปเผยแพร่โดยไม่ได้รับอนุญาต"
    },
    {
      id: "limitation-liability",
      title: "4. การจำกัดความรับผิด",
      content: "เว็บไซต์นี้จัดทำขึ้นแบบ \"ตามสภาพที่ปรากฏ\" (As Is) และ \"ตามที่มีอยู่\" (As Available) เราไม่ขอรับประกันว่าเว็บไซต์จะทำงานได้อย่างต่อเนื่อง ไร้ข้อผิดพลาด หรือปราศจากไวรัส และเราจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่อาจเกิดขึ้นจากการใช้งาน หรือความไม่สามารถใช้งานเว็บไซต์นี้ได้"
    },
    {
      id: "modification",
      title: "5. การเปลี่ยนแปลงข้อกำหนด",
      content: "เราขอสงวนสิทธิ์ในการแก้ไข หรือเปลี่ยนแปลงเงื่อนไขการให้บริการนี้เมื่อใดก็ได้ โดยไม่ต้องแจ้งให้ทราบล่วงหน้า การที่ท่านใช้งานเว็บไซต์ต่อไปหลังจากการเปลี่ยนแปลง จะถือว่าท่านยอมรับข้อกำหนดที่ถูกปรับปรุงแล้ว"
    }
  ]
};

export default function TermsContent() {
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
            activeLink.classList.add("text-blue-700", "bg-blue-50", "font-bold");
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll("div[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
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
            {termsData.title}
          </h1>
          <p className="text-neutral-500 text-lg">
            Terms of Service • ปรับปรุงล่าสุด: {termsData.lastUpdated}
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
                  {termsData.sections.map((s) => (
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
                <p>{termsData.intro1}</p>
                <p>{termsData.intro2}</p>
              </div>
              
              <div className="mt-12 space-y-12">
                {termsData.sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">{s.title}</h2>
                    <p className="text-neutral-600 leading-relaxed mb-4">{s.content}</p>
                    
                    {s.list && (
                      <ul className="space-y-3 mt-2">
                        {s.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-neutral-600">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 mt-0.5">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Back link */}
              <div className="mt-16 pt-8 border-t border-neutral-100">
                <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-blue-700 font-medium transition-colors">
                  <ArrowLeft className="w-5 h-5" /> {termsData.backToHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
