import Link from "next/link";
import Image from "next/image";
import { Home, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <h1 className="text-[120px] md:text-[180px] font-extrabold text-blue-900/10 mb-0 leading-none select-none">
            404
          </h1>
        </div>

        <p className="text-gray-600 mb-10 max-w-md text-center mt-6 text-sm md:text-base leading-relaxed">
          หน้าเว็บที่คุณกำลังพยายามเข้าถึงอาจถูกลบไปแล้ว, เปลี่ยนชื่อ,
          หรือใช้งานไม่ได้ชั่วคราว กรุณาตรวจสอบ URL อีกครั้ง
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all px-8 py-6 h-auto text-base font-semibold">
              <Home className="w-5 h-5 mr-2" />
              กลับสู่หน้าหลัก
            </Button>
          </Link>
          <Link href="/prayer-rooms" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full border-2 border-blue-600 text-blue-700 hover:bg-blue-50 hover:border-blue-700 rounded-xl px-8 py-6 h-auto text-base font-semibold transition-all hover:-translate-y-0.5"
            >
              <Map className="w-5 h-5 mr-2" />
              ค้นหาห้องละหมาด
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
