export interface EventSummary {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  attendees: number;
  maxAttendees: number;
  isJoined: boolean;
}

export interface Participant {
  userId: string;
  name: string;
  avatar: string;
  interests?: string[];
}

export interface EventDetails extends EventSummary {
  organizer: {
    name: string;
    avatar: string;
  };
  category: string;
  ageGroup: string;
  language: string;
  eventCost: number | string;
  rules: string[],
  additionalInfo: string;
  recommendedAgeGroup: string;
  participants: Participant[];
}
