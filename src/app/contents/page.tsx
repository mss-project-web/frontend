import Link from "next/link"

export default function Contents() {
      return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                  <div className="text-center max-w-lg px-10">
                        <div className="pt-5 text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400 mb-4 tracking-tight">
                              เร็วๆนี้
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                              อินชาอัลลอฮฺ
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                              <Link
                                    href="/"
                                    className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                              >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    กลับหน้าหลัก
                              </Link>
                        </div>
                        <div className="mt-12 pt-8 border-t border-slate-200">
                              <p className="text-slate-500 text-sm mb-4">
                                    ต้องการความช่วยเหลือ?
                              </p>
                              <div className="flex flex-wrap justify-center gap-6 text-sm">
                                    <Link href="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">
                                          ติดต่อเรา
                                    </Link>
                              </div>
                        </div>
                  </div>
            </main>
      )
}