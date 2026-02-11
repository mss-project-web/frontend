import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Custom header to bypass Cloudflare managed challenge for server-to-server requests
const CF_BYPASS_SECRET = process.env.CF_BYPASS_SECRET || '';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: CF_BYPASS_SECRET ? { 'X-Custom-Auth': CF_BYPASS_SECRET } : {},
});

export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    description: string;
    tags: string[];
    group?: string;
    coverImage?: string;
    content?: { type: string; data: any }[];
    createdAt: string;
}

export interface BlogPreviewResponse {
    data: BlogPost[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
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

export const getBlogPreviews = async (group?: string, page: number = 1, limit: number = 10): Promise<BlogPreviewResponse | null> => {
    try {
        const params: any = { page, limit };
        // Constructing URL with Params
        const response = await apiClient.get(`/blog/preview`, { params });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching blog previews:', error);
        return null;
    }
};


export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
    try {
        const decodedSlug = decodeURIComponent(slug);
        const url = `${API_URL}/blog/${decodedSlug}`;
        console.log("Fetching blog post from:", url);
        const response = await apiClient.get(`/blog/${decodedSlug}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching blog post ${slug}:`, error);
        return null;
    }
};
