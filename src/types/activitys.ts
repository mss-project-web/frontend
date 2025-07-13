export interface Event {
      id: number;
      name: string;
      category: string;
      description: string;
      date: string;
      time: string;
      location: string;
      imageUrl: string;
}

export interface RoadmapEvent {
      name: string;
      date: string;
      category: string;
      color: string;
}

export interface RoadmapMonth {
      month: string;
      events: RoadmapEvent[];
}

export interface RoadmapModalProps {
      isModalOpen: boolean;
      handleCloseModal: () => void;
      roadmapEvents: RoadmapMonth[];
}