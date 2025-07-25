import { motion } from "framer-motion";

export function AyatQuran() {

      return (
            <>
                  <section className="relative w-full py-16 flex items-center justify-center overflow-hidden">
                        <div
                              className="absolute inset-0 z-0 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500"
                        ></div>

                        <div className="relative z-10 mx-auto max-w-screen-xl px-4 text-center text-white p-6 md:p-8 rounded-lg">
                              <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-5xl font-serif mb-4 drop-shadow-md"
                              >
                                    &ldquo;
                              </motion.div>

                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-lg md:text-2xl leading-relaxed mb-6 font-light drop-shadow-md"
                              >
                                    และจงให้มีขึ้นจากพวกเจ้า ซึ่งคณะหนึ่งที่จะเชิญชวนไปสู่ความดี และใช้ให้กระทำสิ่งที่ชอบ <br/> และห้ามมิให้กระทำสิ่งที่มิชอบ และชนเหล่านี้แหละพวกเขาคือผู้ได้รับความสำเร็จ
                              </motion.div>

                              <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "80px", opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="w-20 h-0.5 bg-white mx-auto mb-4 opacity-70"
                              ></motion.div>

                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="text-base md:text-lg font-medium drop-shadow-md"
                              >
                                    Ali 'Imran : 104
                              </motion.div>
                              <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className="flex justify-center mt-6 space-x-2"
                              >
                                    <span className="block w-2 h-2 bg-white rounded-full opacity-70"></span>
                                    <span className="block w-2 h-2 bg-white rounded-full opacity-70"></span>
                                    <span className="block w-2 h-2 bg-white rounded-full opacity-70"></span>
                              </motion.div>
                        </div>
                  </section>
            </>
      );
}