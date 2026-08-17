// Blog content types

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
  views?: number;
}

export interface BlogPreviewResponse {
  data: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
