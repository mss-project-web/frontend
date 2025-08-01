export interface Activity {
      _id: string;
      name_th: string;
      name_eng: string;
      location: string;
      description: string;
      favorite: boolean;
      images: string | string[];
}

export interface ActivityById {
      _id: string;
      name_th: string;
      name_eng: string;
      location: string;
      participants: number;
      duration: number;
      description: string;
      images: string[];
      objectives: string[];
      goals: string[];
      start_date: string;
      end_date: string;
      feedbacks: string[];
      favorite: boolean;
      createdAt: string;
      updatedAt: string;
}

export interface ActivitiesFavorites {
      _id: string;
      name_th: string;
      name_eng: string;
      location: string;
      description: string;
      favorite: boolean;
      images: string[];
}

export interface ActivityThisMonthResult {
      _id: string;
      name_th: string;
      name_eng: string;
      location: string;
      description: string;
      start_date: string;
      end_date: string;
}

export interface ActivityForCalendarLink {
      name: string;
      description: string;
      location: string;
      start: Date;
      end: Date;
}

export interface ActivityRoadmap {
      _id: string;
      name_th: string;
      name_eng: string;
      location: string;
      description: string;
      start_date: string;
      end_date: string
}

export interface RoadmapEvent {
      name: string;
      date: string;
}

export interface RoadmapMonth {
      month: string;
      events: RoadmapEvent[];
}

export interface RoadmapModalProps {
      isModalOpen: boolean;
      handleCloseModal: () => void;
}