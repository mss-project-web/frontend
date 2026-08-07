import { getPrayerRoomById } from "@/services/prayer";
import { notFound } from "next/navigation";
import { InterceptedPrayerRoomModal } from "./InterceptedModal";

export default async function PrayerRoomModalIntercept({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = await getPrayerRoomById(id);
  if (!room) return notFound();

  return <InterceptedPrayerRoomModal room={room} />;
}
