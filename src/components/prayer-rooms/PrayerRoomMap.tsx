'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { PrayerRoom } from '@/types/prayer';
import L from 'leaflet';

interface PrayerRoomMapProps {
  prayerRooms: PrayerRoom[];
  selectedRoom: number | null;
  onMarkerClick: (roomId: number) => void;
}

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

export function PrayerRoomMap({ prayerRooms, selectedRoom, onMarkerClick }: PrayerRoomMapProps) {
  const defaultCenter: [number, number] = [7.0043915, 100.4949182];
  const defaultZoom = 15;

  const minZoomLevel = 15;
  const maxZoomLevel = 25;

  return (
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
              key={room.id}
              position={[room.coordinates.lat, room.coordinates.lng]}
              icon={selectedRoom === room.id ? selectedMarkerIcon : customMarkerIcon}
              eventHandlers={{
                click: () => onMarkerClick(room.id),
              }}
            >
              <Popup>
                <div className="font-semibold">{room.name}</div>
                <div>{room.address}</div>
                <button
                  className="mt-2 text-blue-600 hover:underline"
                  onClick={() => onMarkerClick(room.id)}
                >
                  ดูรายละเอียด
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
}