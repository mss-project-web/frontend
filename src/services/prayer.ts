import axios from 'axios';
import { PrayerRoom, PrayerRoomFromApi } from '@/types/prayer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const CF_BYPASS_SECRET = process.env.CF_BYPASS_SECRET || '';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: CF_BYPASS_SECRET ? { 'X-Custom-Auth': CF_BYPASS_SECRET } : {},
});

export const getPrayerRoomById = async (id: string): Promise<PrayerRoom | null> => {
    try {
        // Try specific endpoint first
        try {
            const response = await apiClient.get(`/prayer-rooms/${id}`);
            const room: PrayerRoomFromApi = response.data.data;
            if (room) {
                return {
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
                };
            }
        } catch (e: any) {
            // Ignore error and fallback to fetching all rooms
            if (e?.response?.status !== 404) {
               console.warn(`Attempted to fetch room by ID but got error: ${e.message}. Falling back to list fetch.`);
            }
        }

        // Fallback: fetch all rooms and find by ID
        const allRooms = await getAllPrayerRooms();
        const foundRoom = allRooms.find(r => r._id === id || (r as any).id === id);
        return foundRoom || null;
        
    } catch (error) {
        console.error(`Error fetching prayer room ${id}:`, error);
        return null;
    }
};

export const getAllPrayerRooms = async (): Promise<PrayerRoom[]> => {
    try {
        const response = await apiClient.get(`/prayer-rooms`);
        const roomsFromApi: PrayerRoomFromApi[] = response.data.data;
        
        return roomsFromApi.map((room) => ({
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
        }));
    } catch (error) {
        console.error('Error fetching prayer rooms:', error);
        return [];
    }
};
