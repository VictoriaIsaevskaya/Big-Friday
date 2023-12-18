export interface Participant {
  userId: string;
  username: string;
  avatar?: string;
  interests?: string[];
  about?: string,
  ageGroup: string
}

export interface EventDetails {
  organizer: {
    name: string;
    avatar: string;
    uid: string;
  };
  category: string;
  ageGroup: string;
  language: string;
  eventCost: number | string;
  rules: string[],
  additionalInfo: string;
  recommendedAgeGroup: string;
  participants: Participant[];
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  attendees: number;
  maxAttendees: number;
  isJoined: boolean;
  chatId: string;
}
