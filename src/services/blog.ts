import axios from 'axios';
import type { BlogPost, BlogPreviewResponse } from '@/types/blog';

// Re-export so existing imports from @/services/blog still work
export type { BlogPost, BlogPreviewResponse };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Custom header to bypass Cloudflare managed challenge for server-to-server requests
const apiClient = axios.create({
    baseURL: API_URL,
});

// Typed request params
interface BlogPreviewParams {
    page: number;
    limit: number;
    group?: string;
    search?: string;
}

// Fetch options (supports AbortSignal for race-condition prevention)
interface FetchOptions {
    signal?: AbortSignal;
}

export const getBlogGroups = async (): Promise<string[]> => {
    try {
        const response = await apiClient.get(`/blog/groups`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching blog groups:', error);
        return [];
    }
};

export const getBlogPreviews = async (
    group?: string,
    page: number = 1,
    limit: number = 10,
    search?: string,
    options?: FetchOptions
): Promise<BlogPreviewResponse | null> => {
    try {
        const params: BlogPreviewParams = { page, limit };
        if (group && group !== 'all') params.group = group;
        if (search && search.trim()) params.search = search.trim();

        const response = await apiClient.get(`/blog/preview`, {
            params,
            signal: options?.signal,
        });
        return response.data.data;
    } catch (error: any) {
        if (axios.isCancel(error) || error?.name === 'CanceledError') return null;
        console.error('Error fetching blog previews:', error);
        return null;
    }
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
    try {
        const decodedSlug = decodeURIComponent(slug);
        const response = await apiClient.get(`/blog/${decodedSlug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching blog post ${slug}:`, error);
        return null;
    }
};
