import axios from 'axios';
import { PrayerRoom, PrayerRoomFromApi } from '@/types/prayer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: API_URL,
});

// ─── Shared mapper (single source of truth) ───────────────────
// Used by both getPrayerRoomById and getAllPrayerRooms,
// and can be re-used by usePrayerRooms hook.
export const mapPrayerRoom = (room: PrayerRoomFromApi): PrayerRoom => ({
    _id: room._id,
    name: room.name,
    place: room.place,
    faculty: room.faculty,
    coordinates: {
        lat: room.location[0],
        lng: room.location[1],
    },
    images: room.images,
    facilities: room.facilities || [],
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    description: room.description,
    capacity: room.capacity,
    openingHours: room.openingHours,
    phone: room.phone,
    google_map_url: room.google_map_url,
    youtube_url: room.youtube_url,
});

export const getAllPrayerRooms = async (): Promise<PrayerRoom[]> => {
    try {
        const response = await apiClient.get(`/prayer-rooms`);
        const roomsFromApi: PrayerRoomFromApi[] = response.data.data;
        return roomsFromApi.map(mapPrayerRoom);
    } catch (error) {
        console.error('Error fetching prayer rooms:', error);
        return [];
    }
};

export const getPrayerRoomById = async (id: string): Promise<PrayerRoom | null> => {
    try {
        // Try specific endpoint first
        try {
            const response = await apiClient.get(`/prayer-rooms/${id}`);
            const room: PrayerRoomFromApi = response.data.data;
            if (room) return mapPrayerRoom(room);
        } catch (e: any) {
            if (e?.response?.status !== 404) {
                console.warn(`Attempted to fetch room by ID but got error: ${e.message}. Falling back to list fetch.`);
            }
        }

        // Fallback: fetch all rooms and find by ID
        const allRooms = await getAllPrayerRooms();
        return allRooms.find(r => r._id === id || (r as any).id === id) || null;

    } catch (error) {
        console.error(`Error fetching prayer room ${id}:`, error);
        return null;
    }
};
