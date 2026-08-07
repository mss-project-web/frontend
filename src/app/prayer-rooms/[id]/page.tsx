import { getPrayerRoomById } from "@/services/prayer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import {
  MapPin,
  Users,
  Clock,
  Phone,
  Navigation,
  Youtube,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const room = await getPrayerRoomById(id);
  if (!room) return { title: "ไม่พบห้องละหมาด" };

  const title = `ห้องละหมาด${room.name} - มหาวิทยาลัยสงขลานครินทร์`;
  const description =
    room.description ||
    `ข้อมูลห้องละหมาด${room.name} คณะ${room.faculty} สถานที่ ${room.place}`;
  const imageUrl =
    room.images && room.images.length > 0
      ? room.images[0]
      : "https://mss-project-web.vercel.app/LOGO/LOGO-MSS.png"; // Fallback image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "th_TH",
      siteName: "MSS PSU Hatyai",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `ห้องละหมาด ${room.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

import { ShareRoomButton } from "@/components/prayer-rooms/ShareRoomButton";
import { ImageGallery } from "@/components/prayer-rooms/ImageGallery";

export default async function PrayerRoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = await getPrayerRoomById(id);
  if (!room) return notFound();

  const getGoogleMapsNavigationUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
    <main className="min-h-screen bg-white py-5 md:py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Navigation */}
        <div className="mb-2">
          <Link
            href="/prayer-rooms"
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> กลับไปหน้าแผนที่
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {room.name.startsWith("ห้องละหมาด")
              ? room.name
              : `ห้องละหมาด${room.name}`}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex items-center text-gray-500 text-base">
              <MapPin className="w-4 h-4 mr-2 shrink-0" />
              {room.place}, {room.faculty}
            </div>
            <div>
              <ShareRoomButton
                roomId={room._id!}
                roomName={room.name}
                roomPlace={room.place}
                roomFaculty={room.faculty}
              />
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={room.images || []} roomName={room.name} />

        {/* Content Section */}
        <div className="space-y-12 pb-20">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">รายละเอียด</h2>
            <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
              {room.description || "ไม่มีคำอธิบายเพิ่มเติม"}
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 rounded-2xl p-6 md:p-8">
            {room.capacity !== undefined && (
              <div className="flex items-start">
                <Users className="w-5 h-5 text-gray-400 mr-3 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    รองรับได้
                  </div>
                  <div className="text-base text-gray-600 mt-1">
                    {room.capacity} คน
                  </div>
                </div>
              </div>
            )}
            {room.openingHours && (
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    เวลาทำการ
                  </div>
                  <div className="text-base text-gray-600 mt-1">
                    {room.openingHours}
                  </div>
                </div>
              </div>
            )}
            {room.phone && (
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    ติดต่อ
                  </div>
                  <div className="text-base text-gray-600 mt-1">
                    {room.phone}
                  </div>
                </div>
              </div>
            )}
          </div>

          {room.facilities && room.facilities.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                สิ่งอำนวยความสะดวก
              </h2>
              <div className="flex flex-wrap gap-2">
                {room.facilities.map((facility, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-transparent font-normal px-4 py-2 text-sm rounded-full"
                  >
                    {facility}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            {room.coordinates?.lat && room.coordinates?.lng && (
              <a
                href={getGoogleMapsNavigationUrl(
                  room.coordinates.lat,
                  room.coordinates.lng,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 block"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl h-14 text-base">
                  <Navigation className="w-5 h-5 mr-2" /> นำทาง Google Maps
                </Button>
              </a>
            )}

            {room.youtube_url && (
              <a
                href={room.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 block"
              >
                <Button
                  variant="outline"
                  className="w-full font-medium rounded-xl h-14 text-base border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Youtube className="w-5 h-5 mr-2 text-red-500" /> วิดีโอนำทาง
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
