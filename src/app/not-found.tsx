import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="text-center max-w-md">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800">
          ไม่พบหน้าที่คุณต้องการ
        </h2>
        <p className="text-blue-600 mt-2">
          หน้านี้อาจถูกลบ เปลี่ยนชื่อ หรือคุณพิมพ์ URL ไม่ถูกต้อง
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  )
}
