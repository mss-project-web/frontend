import { getPrayerRoomById } from "@/services/prayer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { MapPin, Users, Clock, Phone, Navigation, Youtube, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const room = await getPrayerRoomById(id);
  if (!room) return { title: "ไม่พบห้องละหมาด" };
  return {
    title: `ห้องละหมาด${room.name} - มหาวิทยาลัยสงขลานครินทร์`,
    description: room.description || `ข้อมูลห้องละหมาด${room.name} คณะ${room.faculty} สถานที่ ${room.place}`,
  };
}

export default async function PrayerRoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = await getPrayerRoomById(id);
  if (!room) return notFound();

  const getGoogleMapsNavigationUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/prayer-rooms" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> ย้อนกลับไปหน้าแผนที่
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
           {/* Header Section */}
           <div className="bg-blue-600 text-white p-8 md:p-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
               <div className="relative z-10">
                 <h1 className="text-3xl md:text-5xl font-extrabold mb-4">ห้องละหมาด{room.name}</h1>
                 <p className="flex items-center text-blue-100 text-lg"><MapPin className="w-5 h-5 mr-2 shrink-0"/> {room.place}, {room.faculty}</p>
               </div>
           </div>
           
           <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10">
              {/* Left Column: Images */}
              <div className="w-full md:w-1/2 space-y-4">
                {room.images && room.images.length > 0 ? (
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm border border-slate-100">
                      <Image src={room.images[0]} alt={room.name} fill className="object-cover" unoptimized priority />
                    </div>
                    {room.images.length > 1 && (
                      <div className="grid grid-cols-2 gap-4">
                        {room.images.slice(1, 3).map((img, idx) => (
                          <div key={idx} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm border border-slate-100">
                            <Image src={img} alt={`${room.name} ${idx+2}`} fill className="object-cover" unoptimized />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] w-full bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                     ไม่มีรูปภาพประกอบ
                  </div>
                )}
              </div>

              {/* Right Column: Details */}
              <div className="w-full md:w-1/2 flex flex-col">
                <div className="prose prose-slate mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">รายละเอียดห้อง</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {room.description || "ไม่มีคำอธิบายเพิ่มเติมสำหรับห้องละหมาดนี้"}
                  </p>
                </div>

                <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {room.capacity !== undefined && (
                    <div className="flex items-center space-x-3 text-slate-700 font-medium">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Users className="w-4 h-4" /></div>
                      <span>รองรับได้: {room.capacity} คน</span>
                    </div>
                  )}
                  {room.openingHours && (
                    <div className="flex items-center space-x-3 text-slate-700 font-medium">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Clock className="w-4 h-4" /></div>
                      <span>เวลาทำการ: {room.openingHours}</span>
                    </div>
                  )}
                  {room.phone && (
                    <div className="flex items-center space-x-3 text-slate-700 font-medium">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Phone className="w-4 h-4" /></div>
                      <span>โทร: {room.phone}</span>
                    </div>
                  )}
                </div>

                {room.facilities && room.facilities.length > 0 && (
                  <div className="mb-10">
                    <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">สิ่งอำนวยความสะดวก</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-sm px-3 py-1 bg-white border-slate-200 text-slate-600 shadow-sm">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto space-y-3">
                   {room.coordinates?.lat && room.coordinates?.lng && (
                     <a href={getGoogleMapsNavigationUrl(room.coordinates.lat, room.coordinates.lng)} target="_blank" rel="noopener noreferrer" className="block">
                       <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg rounded-xl shadow-lg shadow-blue-200 font-bold">
                         <Navigation className="w-5 h-5 mr-2" /> นำทางด้วย Google Maps
                       </Button>
                     </a>
                   )}
                   {room.youtube_url && (
                     <a href={room.youtube_url} target="_blank" rel="noopener noreferrer" className="block">
                       <Button variant="outline" className="w-full h-12 text-base rounded-xl border-red-200 text-red-600 hover:bg-red-50 font-bold">
                         <Youtube className="w-5 h-5 mr-2" /> คลิปวิดีโอนำทาง
                       </Button>
                     </a>
                   )}
                </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
