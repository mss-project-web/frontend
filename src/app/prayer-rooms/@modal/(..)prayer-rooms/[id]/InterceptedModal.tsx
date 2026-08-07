'use client';

import { useRouter } from 'next/navigation';
import { PrayerRoomDetailModal } from '@/components/prayer-rooms/PrayerRoomDetailModal';
import { PrayerRoom } from '@/types/prayer';

export function InterceptedPrayerRoomModal({ room }: { room: PrayerRoom }) {
  const router = useRouter();
  
  return (
    <PrayerRoomDetailModal 
       isOpen={true} 
       onClose={() => router.back()} 
       room={room} 
    />
  );
}
