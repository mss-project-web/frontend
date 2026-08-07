import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config";

export interface Phone { label: string; number: string; }

export interface SiteSettings {
    contact: {
        phones: Phone[];
        email: string;
        socials: { facebook?: string; instagram?: string; youtube?: string; line?: string; tiktok?: string };
        address?: string;
        mapUrl?: string;
        openingHours?: string;
    };
    donation: {
        bankName?: string;
        accountName?: string;
        accountNumber?: string;
        promptpay?: string;
        qrImage?: string;
        note?: string;
    };
}

const EMPTY: SiteSettings = {
    contact: { phones: [], email: "", socials: {} },
    donation: {},
};

/** Site-wide contact + donation info, managed from the admin dashboard. */
export function useSettings() {
    const [settings, setSettings] = useState<SiteSettings>(EMPTY);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        axios
            .get(`${API_URL}/settings`)
            .then((res) => {
                if (!active) return;
                const data = res.data?.data as SiteSettings | undefined;
                if (data) {
                    setSettings({
                        contact: { ...EMPTY.contact, ...data.contact },
                        donation: { ...EMPTY.donation, ...data.donation },
                    });
                }
            })
            .catch((err) => active && setError(err.message || "โหลดข้อมูลติดต่อไม่สำเร็จ"))
            .finally(() => active && setLoading(false));
        return () => {
            active = false;
        };
    }, []);

    return { settings, loading, error };
}
