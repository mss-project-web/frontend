"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { PrayerRoom } from "@/types/prayer";
import { usePrayerRooms } from "@/hooks/prayer/usePrayerRooms";
import L from "leaflet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Loader2,
  Navigation,
  MapPin,
  Maximize,
  Minimize,
  Compass,
  X,
  AlertTriangle,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { calculateDistance, formatDistance } from "@/utils/distance";
import Image from "next/image";
import { PrayerRoomDetailModal } from "./PrayerRoomDetailModal";

const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedMarkerIcon = new L.Icon({
  iconUrl: "/red-marker-icon.png", // Fallback to custom marker if you have one, or just use the same as custom for now. Wait, I'll use a hue-rotated filter via CSS or just the same marker if not available.
  iconRetinaUrl: "/red-marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userLocationIcon = L.divIcon({
  html: `<div class="relative flex items-center justify-center w-6 h-6">
           <div class="absolute w-full h-full bg-blue-500 rounded-full animate-ping opacity-75"></div>
           <div class="relative w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md"></div>
         </div>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapUpdater({
  userLocation,
  focusedRoom,
}: {
  userLocation: [number, number] | null;
  focusedRoom: PrayerRoom | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (focusedRoom) {
      map.flyTo(
        [focusedRoom.coordinates.lat, focusedRoom.coordinates.lng],
        18,
        {
          animate: true,
          duration: 1.5,
        },
      );
    } else if (userLocation) {
      map.flyTo(userLocation, 16, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [userLocation, focusedRoom, map]);

  // Invalidate size when map container dimensions change (e.g. fullscreen toggle)
  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 100); // Wait for transition
    return () => clearTimeout(timeout);
  }, [map]);

  return null;
}

function BrowserWarning() {
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isApp = /FBAN|FBAV|Instagram|Line/i.test(ua);
    setIsInApp(isApp);
  }, []);

  if (!isInApp) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl mb-4 text-amber-800 text-xs md:text-sm flex items-start gap-3 shadow-sm">
      <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
      <div>
        <p className="font-bold mb-1">
          คุณกำลังใช้งานผ่านเบราว์เซอร์ในแอป (In-App Browser)
        </p>
        <p>
          ฟีเจอร์ "ค้นหาตำแหน่งใกล้ฉัน" อาจจะไม่ทำงาน
          แนะนำให้กดปุ่มมุมขวาบนแล้วเลือกเปิดใน <b>Safari</b> หรือ <b>Chrome</b>{" "}
          แทนครับ
        </p>
      </div>
    </div>
  );
}

export default function PrayerRoomMapPage() {
  const { prayerRooms, loading, error, refetch } = usePrayerRooms();
  const [focusedRoom, setFocusedRoom] = useState<PrayerRoom | null>(null);
  const [selectedRoomModal, setSelectedRoomModal] = useState<PrayerRoom | null>(
    null,
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNearestPanel, setShowNearestPanel] = useState(true);

  const {
    latitude,
    longitude,
    loading: geoLoading,
    error: geoError,
    getLocation,
  } = useGeolocation();

  const defaultCenter: [number, number] = [7.0087432, 100.4965171];
  const defaultZoom = 15;
  const maxZoomLevel = 25;

  const nearestRooms = useMemo(() => {
    if (!latitude || !longitude || prayerRooms.length === 0) return [];
    const roomsWithDist = prayerRooms.map((room) => ({
      ...room,
      distance: calculateDistance(
        latitude,
        longitude,
        room.coordinates.lat,
        room.coordinates.lng,
      ),
    }));
    return roomsWithDist.sort((a, b) => a.distance - b.distance).slice(0, 3);
  }, [latitude, longitude, prayerRooms]);

  const showSkeleton = loading || !!error;

  return (
    <>
      <BrowserWarning />
      <div
        className={
          isFullscreen
            ? "fixed inset-0 z-[9999] bg-white flex flex-col"
            : "w-full"
        }
      >
        <div
          className={`relative ${isFullscreen ? "h-full rounded-none" : "h-[500px] md:h-[600px] rounded-2xl"} overflow-hidden bg-gray-50 flex flex-col z-0`}
        >
          {geoError && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium shadow-md border border-red-200">
              {geoError}
            </div>
          )}

          {showSkeleton ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gray-100">
              <Loader2 className="animate-spin w-10 h-10 mb-4 text-blue-600" />
              <p className="text-lg font-bold text-gray-600">
                กำลังโหลดแผนที่...
              </p>
            </div>
          ) : (
            <>
              {/* Fullscreen Toggle & Location Controls */}
              <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                <Button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 shadow-md h-10 w-10 p-0 rounded-xl"
                  title="เต็มจอ"
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  onClick={getLocation}
                  disabled={geoLoading}
                  className="bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 shadow-md h-10 w-10 p-0 rounded-xl"
                  title="ตำแหน่งของฉัน"
                >
                  <Navigation
                    className={`w-5 h-5 ${geoLoading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>

              {/* Floating Nearest Panel */}
              <div className="absolute bottom-6 left-4 z-[1000] w-[calc(100%-2rem)] md:w-80 max-h-[50%] flex flex-col gap-2 pointer-events-none">
                {!latitude && !geoLoading && showNearestPanel && (
                  <div className="pointer-events-auto shadow-xl rounded-2xl overflow-hidden">
                    <Button
                      onClick={getLocation}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 h-auto rounded-none text-base font-bold"
                    >
                      <Navigation className="w-5 h-5 mr-2" />{" "}
                      ค้นหาห้องละหมาดใกล้ฉัน
                    </Button>
                  </div>
                )}

                {geoLoading && (
                  <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 pointer-events-auto">
                    <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
                    <span className="text-sm font-bold text-slate-700">
                      กำลังค้นหาตำแหน่งของคุณ...
                    </span>
                  </div>
                )}

                {nearestRooms.length > 0 && showNearestPanel && (
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-gray-100 backdrop-blur-sm bg-white/95">
                    <div className="bg-slate-900 p-3 text-white flex justify-between items-center shrink-0">
                      <span className="font-bold text-sm flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-blue-400" />
                        ใกล้คุณที่สุด (3 อันดับ)
                      </span>
                      <button
                        onClick={() => setShowNearestPanel(false)}
                        className="hover:bg-white/20 p-1 rounded-md transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-64 p-2 space-y-1">
                      {nearestRooms.map((room) => (
                        <div
                          key={room._id}
                          onClick={() => {
                            const confirmNav = window.confirm(
                              `คุณต้องการเปิด Google Maps เพื่อนำทางไปยัง "ห้องละหมาด${room.name}" เลยหรือไม่?`,
                            );
                            if (confirmNav) {
                              window.open(
                                room.google_map_url ||
                                  `https://www.google.com/maps/dir/?api=1&destination=${room.coordinates.lat},${room.coordinates.lng}`,
                                "_blank",
                              );
                            } else {
                              setFocusedRoom(room);
                            }
                          }}
                          className="p-2 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 cursor-pointer transition-all flex items-center gap-3"
                        >
                          {room.images && room.images.length > 0 ? (
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 bg-slate-100 shadow-sm">
                              <Image
                                src={room.images[0]}
                                alt={room.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 bg-slate-100 shadow-sm flex items-center justify-center">
                              <MapPin className="text-slate-300 w-5 h-5" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-slate-800 line-clamp-2">
                              ห้องละหมาด{room.name}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-slate-500 line-clamp-2 max-w-[120px]">
                                <MapPin className="inline w-3 h-3 mr-1" />
                                {room.place}
                              </span>
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold shadow-sm border border-emerald-200">
                                {formatDistance(room.distance)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!showNearestPanel && nearestRooms.length > 0 && (
                  <Button
                    onClick={() => setShowNearestPanel(true)}
                    className="w-12 h-12 rounded-full p-0 bg-blue-600 text-white shadow-xl pointer-events-auto hover:scale-105 transition-transform"
                  >
                    <Navigation className="w-5 h-5" />
                  </Button>
                )}
              </div>

              {/* Map */}
              <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
                minZoom={12}
                maxZoom={maxZoomLevel}
                zoomControl={false} // We can add custom zoom control if needed, or leave it. Usually false is cleaner if we have scroll wheel. Leaflet adds it by default top-left.
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {latitude && longitude && (
                  <Marker
                    position={[latitude, longitude]}
                    icon={userLocationIcon}
                  >
                    <Popup>คุณอยู่ที่นี่</Popup>
                  </Marker>
                )}

                <MapUpdater
                  userLocation={
                    latitude && longitude ? [latitude, longitude] : null
                  }
                  focusedRoom={focusedRoom}
                />

                {prayerRooms.map((room) => (
                  <Marker
                    key={room._id}
                    position={[room.coordinates.lat, room.coordinates.lng]}
                    icon={
                      focusedRoom && focusedRoom._id === room._id
                        ? selectedMarkerIcon
                        : customMarkerIcon
                    }
                    eventHandlers={{
                      click: () => {
                        setFocusedRoom(room);
                      },
                    }}
                  >
                    <Popup
                      className="rounded-2xl p-0 overflow-hidden shadow-2xl border-0"
                      closeButton={true}
                    >
                      <div className="flex flex-col min-w-[240px] max-w-[280px] pb-2">
                        {room.images && room.images.length > 0 && (
                          <div className="relative h-32 w-full overflow-hidden bg-slate-100 rounded-t-xl mb-3">
                            <Image
                              src={room.images[0]}
                              alt={room.name}
                              fill
                              className="object-cover w-full h-full"
                              unoptimized
                            />
                            {latitude && longitude && (
                              <div className="absolute bottom-2 right-2 bg-emerald-500/90 text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-md backdrop-blur-sm">
                                ห่าง{" "}
                                {formatDistance(
                                  calculateDistance(
                                    latitude,
                                    longitude,
                                    room.coordinates.lat,
                                    room.coordinates.lng,
                                  ),
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="px-4">
                          <h3 className="font-extrabold text-slate-900 text-sm mb-1.5 leading-tight line-clamp-2">
                            ห้องละหมาด{room.name}
                          </h3>
                          <div className="flex items-start gap-1.5 text-slate-500 text-xs mb-4">
                            <MapPin className="w-3.5 h-3.5 shrink-0 mt-[1px]" />
                            <span className="line-clamp-2">{room.place}</span>
                          </div>

                          <div className="flex gap-2 w-full">
                            <div className="flex-1">
                              <Button
                                size="sm"
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white h-9 text-[11px] font-bold rounded-lg shadow-sm"
                                onClick={() => setSelectedRoomModal(room)}
                              >
                                รายละเอียด
                              </Button>
                            </div>
                            <a
                              href={
                                room.google_map_url ||
                                `https://www.google.com/maps/dir/?api=1&destination=${room.coordinates.lat},${room.coordinates.lng}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full h-9 text-[11px] font-bold border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg px-0"
                              >
                                <Compass className="w-3.5 h-3.5 mr-1" /> นำทาง
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </>
          )}
        </div>
      </div>
      <PrayerRoomDetailModal
        isOpen={!!selectedRoomModal}
        onClose={() => setSelectedRoomModal(null)}
        room={selectedRoomModal}
      />
    </>
  );
}
