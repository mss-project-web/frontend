"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
      images: string[];
}

export default function ActivityGallery({ images }: Props) {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);
      const [showAll, setShowAll] = useState(false);

      const imagesToShow = showAll ? images : images.slice(0, 8);

      return (
            <>
                  {/* Gallery แบบ grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.length > 0 ? (
                              imagesToShow.map((img, index) => (
                                    <div
                                          key={index}
                                          className="relative w-full aspect-[1/1] rounded-lg overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl cursor-pointer"
                                          onClick={() => setSelectedImage(img)}
                                    >
                                          <Image
                                                src={img}
                                                alt={`กิจกรรม ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-300 hover:scale-110"
                                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                          />
                                    </div>
                              ))
                        ) : (
                              <div className="col-span-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 shadow-md">
                                    ไม่มีรูปภาพ
                              </div>
                        )}
                  </div>

                  {/* ปุ่มแสดงเพิ่มเติม */}
                  {images.length > 8 && !showAll && (
                        <div className="mt-4 flex justify-center">
                              <button
                                    onClick={() => setShowAll(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                              >
                                    แสดงเพิ่มเติม
                              </button>
                        </div>
                  )}

                  {/* Modal รูปใหญ่ */}
                  {selectedImage && (
                        <div
                              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                              onClick={() => setSelectedImage(null)}
                        >
                              <div
                                    className="relative max-w-4xl max-h-[90vh]"
                                    onClick={(e) => e.stopPropagation()}
                              >
                                    <button
                                          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-75 transition"
                                          onClick={() => setSelectedImage(null)}
                                          aria-label="ปิดรูปภาพ"
                                    >
                                          ✕
                                    </button>
                                    <Image
                                          src={selectedImage}
                                          alt="รูปภาพกิจกรรม"
                                          width={1200}
                                          height={800}
                                          className="rounded-lg object-contain max-h-[90vh]"
                                    />
                              </div>
                        </div>
                  )}
            </>
      );
}
