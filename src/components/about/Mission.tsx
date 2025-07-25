"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, ChevronDown } from "lucide-react";
import { values, mission } from "@/data/aboutData";

export function Mission() {
      const [activeTab, setActiveTab] = useState("mission");
      const [activeIndex, setActiveIndex] = useState<number | null>(null);

      return (
            <>
                  <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                        <div
                              className="absolute inset-0 z-0"
                              style={{
                                    background: `
              radial-gradient(circle at 10% 90%, rgba(147, 197, 253, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
            `,
                              }}
                        ></div>

                        {/* Content Container aligned with HomePage's max-w-screen-xl and px-4 */}
                        <div className="mx-auto max-w-screen-xl px-4 relative z-10">
                              <div className="mx-auto">
                                    <div className="text-center mb-5">
                                          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                                                วิสัยทัศน์และพันธกิจ
                                          </h2>
                                          <p className="text-lg text-gray-600">
                                                หลักการและความเชื่อที่เป็นรากฐานของการทำงาน
                                          </p>
                                    </div>

                                    <div className="flex justify-center mb-5">
                                          <div className="bg-blue-100 p-1.5 rounded-xl shadow-inner">
                                                <Button
                                                      variant={activeTab === "mission" ? "default" : "ghost"}
                                                      onClick={() => setActiveTab("mission")}
                                                      className={`py-2.5 rounded-lg text-base ${activeTab === "mission" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-200"}`}
                                                >
                                                      วิสัยทัศน์
                                                </Button>
                                                <Button
                                                      variant={activeTab === "values" ? "default" : "ghost"}
                                                      onClick={() => setActiveTab("values")}
                                                      className={`py-2.5 rounded-lg text-base ${activeTab === "values" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-blue-200"}`}
                                                >
                                                      พันธกิจ
                                                </Button>
                                          </div>
                                    </div>

                                    {activeTab === "mission" && (
                                          <motion.div
                                                key="mission-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.5 }}
                                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6"
                                          >
                                                {mission.map((mission, index) => (
                                                      <Card
                                                            key={index}
                                                            className="relative border border-blue-200 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-blue-400/50 hover:-translate-y-3 group bg-white/60 backdrop-blur-lg flex flex-col"
                                                      >
                                                            <CardContent className="p-8 pt-8 pb-12 text-center flex flex-col flex-grow relative">
                                                                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                                                                        <mission.icon className="w-7 h-7 text-white" />
                                                                  </div>
                                                                  <div className="text-lg md:text-lg font-bold mb-3">{mission.title}</div>
                                                            </CardContent>
                                                      </Card>
                                                ))}

                                          </motion.div>
                                    )}

                                    {activeTab === "values" && (
                                          <motion.div
                                                key="values-cards"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.5 }}
                                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6" // Overall padding
                                          >
                                                {values.map((value, index) => (

                                                      <Card
                                                            key={index}
                                                            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                                                            className="cursor-pointer relative border border-blue-200 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-blue-400/50 hover:-translate-y-3 group bg-white/60 backdrop-blur-lg flex flex-col"
                                                      >
                                                            <CardContent className="p-8 pt-8 pb-12 text-center flex flex-col flex-grow relative">
                                                                  <div className="w-16 h-16 mb-6 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center transition-transform duration-300 shadow-lg border-4 border-white">
                                                                        <value.icon className="w-7 h-7 text-white" />
                                                                  </div>

                                                                  <div className="text-base sm:text-lg font-extrabold text-blue-900 mb-2 tracking-tight leading-snug">
                                                                        {value.title}
                                                                  </div>

                                                                  <div
                                                                        className={`text-gray-700 text-sm sm:text-base leading-relaxed mt-2 transition-all duration-500 overflow-hidden ${index === activeIndex ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
                                                                              }`}
                                                                  >
                                                                        {value.description}
                                                                  </div>

                                                                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                                                        <ChevronDown
                                                                              className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${index === activeIndex ? "rotate-180" : "rotate-0"
                                                                                    }`}
                                                                        />
                                                                  </div>
                                                            </CardContent>

                                                            {/* Bottom gradient bar */}
                                                            <div
                                                                  className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-opacity duration-500 rounded-b-3xl ${index === activeIndex ? "opacity-100" : "opacity-0"
                                                                        }`}
                                                            />
                                                      </Card>
                                                ))}
                                          </motion.div>
                                    )}
                              </div>
                        </div>
                  </section>
            </>
      );
}