import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { faqs } from "@/data/faqsData"

export default function FAQSection() {
      const [openIndex, setOpenIndex] = useState<number | null>(null)

      const toggle = (index: number) => {
            setOpenIndex(openIndex === index ? null : index)
      }

      return (
            <section className="py-10 bg-gray-50">
                  <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                              <h2 className="font-extrabold text-blue-800 border-b-2 border-gray-300 inline-block pb-1 mb-4">
                                    คำถามที่พบบ่อย
                              </h2>
                                    <p className="text-xl text-gray-600">คำตอบสำหรับคำถามที่ได้รับบ่อยๆ</p>
                        </div>
                        <div className="max-w-3xl mx-auto space-y-4">
                              {faqs.map((faq, index) => (
                                    <div
                                          key={index}
                                          className="bg-white border border-gray-200 rounded-xl shadow-sm"
                                    >
                                          <button
                                                onClick={() => toggle(index)}
                                                className="w-full flex justify-between items-center text-left p-5 text-gray-800 font-medium hover:bg-gray-100 transition"
                                          >
                                                <span>{faq.question}</span>
                                                <ChevronDown
                                                      className={`w-5 h-5 transform transition-transform duration-300 ${openIndex === index ? "rotate-180 text-blue-600" : "text-gray-400"
                                                            }`}
                                                />
                                          </button>
                                          {openIndex === index && (
                                                <div className="px-5 py-5 text-gray-600">{faq.answer}</div>
                                          )}
                                    </div>
                              ))}
                        </div>
                  </div>
            </section>
      )
}