export interface News {
      _id: string;
      name: string;
      date: string;
      images: string[];
      link: string;
      description: string;
      createdAt: string;
      updatedAt: string;
}
export interface NewsItem {
      _id: string;
      name: string;
      date: string;
      images?: string[];
      link: string;
      description: string;
    }