"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
      images: string[];
}

export default function ActivityGallery({ images }: Props) {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);

      return (
            <>
                  {/* Gallery รูปเล็ก */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {images.length > 0 ? (
                              images.slice(0, 4).map((img, index) => (
                                    <div
                                          key={index}
                                          className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer"
                                          onClick={() => setSelectedImage(img)}
                                    >
                                          <Image
                                                src={img}
                                                alt={`กิจกรรม ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                          />
                                    </div>
                              ))
                        ) : (
                              <div className="col-span-2 aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
                                    <span className="text-gray-500">ไม่มีรูปภาพ</span>
                              </div>
                        )}
                  </div>


                  {/* Modal แสดงรูปใหญ่ */}
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
