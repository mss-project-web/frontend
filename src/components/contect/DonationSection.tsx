"use client"

import { useState } from "react"
import { HeartHandshake, Copy, Check, Landmark, QrCode } from "lucide-react"
import { useSettings } from "@/lib/hooks/useSettings"
import { CONTACT } from "@/lib/constants"

export default function DonationSection() {
      const { settings } = useSettings()
      const [copied, setCopied] = useState(false)

      // Fall back to the bundled constants until the API returns data.
      const bankName = settings.donation.bankName || CONTACT.bank
      const accountName = settings.donation.accountName || CONTACT.accountName
      const accountNumber = settings.donation.accountNumber || CONTACT.accountNumber
      const promptpay = settings.donation.promptpay
      const qrImage = settings.donation.qrImage
      const note = settings.donation.note || "ร่วมเป็นส่วนหนึ่งในการสนับสนุนกิจกรรมของชมรม"

      if (!accountNumber && !qrImage) return null

      const copyAccount = async () => {
            try {
                  await navigator.clipboard.writeText(accountNumber.replace(/\D/g, ""))
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
            } catch {
                  /* clipboard unavailable */
            }
      }

      return (
            <section className="bg-gradient-to-br from-blue-50 to-white py-14">
                  <div className="container mx-auto px-4 max-w-screen-xl">
                        <div className="text-center mb-8">
                              <div className="inline-flex items-center gap-2 text-2xl font-extrabold text-blue-800 border-b-2 border-gray-300 pb-1">
                                    <HeartHandshake className="w-7 h-7 text-emerald-500" />
                                    ร่วมบริจาค / สนับสนุน
                              </div>
                              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{note}</p>
                        </div>

                        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                              <div className="grid grid-cols-1 md:grid-cols-2">
                                    {/* Bank details */}
                                    <div className="p-8 space-y-5">
                                          <div className="flex items-center gap-2 text-blue-800 font-bold text-lg">
                                                <Landmark className="w-5 h-5" /> โอนผ่านบัญชีธนาคาร
                                          </div>
                                          <div>
                                                <div className="text-sm text-gray-500">ธนาคาร</div>
                                                <div className="text-gray-900 font-medium">{bankName}</div>
                                          </div>
                                          <div>
                                                <div className="text-sm text-gray-500">ชื่อบัญชี</div>
                                                <div className="text-gray-900 font-medium">{accountName}</div>
                                          </div>
                                          <div>
                                                <div className="text-sm text-gray-500">เลขที่บัญชี</div>
                                                <div className="flex items-center gap-3">
                                                      <span className="text-2xl font-bold tracking-wider text-blue-700">{accountNumber}</span>
                                                      <button
                                                            onClick={copyAccount}
                                                            className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                                      >
                                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                            {copied ? "คัดลอกแล้ว" : "คัดลอก"}
                                                      </button>
                                                </div>
                                          </div>
                                          {promptpay && (
                                                <div>
                                                      <div className="text-sm text-gray-500">พร้อมเพย์ (PromptPay)</div>
                                                      <div className="text-gray-900 font-medium">{promptpay}</div>
                                                </div>
                                          )}
                                    </div>

                                    {/* QR */}
                                    <div className="bg-blue-600 text-white p-8 flex flex-col items-center justify-center">
                                          <div className="flex items-center gap-2 font-semibold mb-4">
                                                <QrCode className="w-5 h-5" /> สแกนเพื่อบริจาค
                                          </div>
                                          {qrImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={qrImage} alt="QR บริจาค" className="w-52 h-52 object-contain bg-white rounded-xl p-3 shadow-lg" />
                                          ) : (
                                                <div className="w-52 h-52 flex items-center justify-center bg-white/10 rounded-xl text-white/70 text-sm text-center px-4">
                                                      ยังไม่มี QR<br />โอนผ่านเลขบัญชีด้านซ้ายได้เลย
                                                </div>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      )
}
