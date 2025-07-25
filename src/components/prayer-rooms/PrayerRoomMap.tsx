'use client';

import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { PrayerRoom } from '@/types/prayer';
import { usePrayerRooms } from '@/lib/hooks/usePrayerRooms';
import { Loader2, AlertTriangle } from 'lucide-react';
import L from 'leaflet';
import { PrayerRoomDetailModal } from '@/components/prayer-rooms/PrayerRoomDetailModal';

const customMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedMarkerIcon = new L.Icon({
  iconUrl: '/red-marker-icon.png',
  iconRetinaUrl: '/red-marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function PrayerRoomMapPage() {
  const { prayerRooms, loading, error } = usePrayerRooms();
  const [selectedRoom, setSelectedRoom] = useState<PrayerRoom | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultCenter: [number, number] = [7.0043915, 100.4949182];
  const defaultZoom = 15;
  const minZoomLevel = 15;
  const maxZoomLevel = 25;

  const handleOpenModal = useCallback((room: PrayerRoom) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRoom(null);
    setIsModalOpen(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-600">
        <AlertTriangle className="mr-2" /> Error: {error}
      </div>
    );
  }

  return (
    <>
      <Card className="border-none shadow-lg">
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
            minZoom={minZoomLevel}
            maxZoom={maxZoomLevel}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {prayerRooms.map((room) => (
              <Marker
                key={room._id}
                position={[room.coordinates.lat, room.coordinates.lng]}
                icon={
                  selectedRoom && selectedRoom._id === room._id
                    ? selectedMarkerIcon
                    : customMarkerIcon
                }
                eventHandlers={{
                  click: () => handleOpenModal(room),
                }}
              />
            ))}
          </MapContainer>
        </div>
      </Card>

      {selectedRoom && (
        <PrayerRoomDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          room={selectedRoom}
        />
      )}
    </>
  );
}
