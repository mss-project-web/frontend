import { useState, useEffect } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const getLocation = () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        latitude: null,
        longitude: null,
        error: "เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง",
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        let errorMessage = "ไม่สามารถดึงข้อมูลตำแหน่งได้";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "คุณปฏิเสธการเข้าถึงตำแหน่งที่ตั้ง";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "ไม่สามารถระบุตำแหน่งของคุณได้ในขณะนี้";
            break;
          case error.TIMEOUT:
            errorMessage = "หมดเวลาในการขอตำแหน่งที่ตั้ง";
            break;
        }
        setState({
          latitude: null,
          longitude: null,
          error: errorMessage,
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return { ...state, getLocation };
}
