import React from "react";
import QRCodeGenerator from "@/components/qrcode/QRCodeGenerator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator | Muslim Student Society",
  description:
    "สร้าง QR Code ฟรี ปรับแต่งสี ใส่โลโก้ รองรับ URL, Text, Email, WiFi และเปลี่ยนรูปแบบได้ตามต้องการ",
};

export default function GenQRCodePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            สร้าง <span className="text-[#1588c9]">QR Code</span> ของคุณเอง
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            ปรับแต่งสี รูปแบบ ใส่โลโก้ รองรับ URL สามารถคัดลอก QR Code
            ไปวางได้ทันที
            <br />
            รองรับดาวน์โหลดเป็น PNG, JPG, SVG หรือ PDF
          </p>
        </div>

        <QRCodeGenerator />
      </div>
    </div>
  );
}
