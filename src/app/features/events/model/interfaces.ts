export interface EventSummary {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  attendees: number;
  maxAttendees: number;
  isJoined: boolean;
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
  additionalInfo: string
}

export interface EventsState {
  events: EventSummary[];
  loadingStatus: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
  selectedEvent: EventDetails | null;
  createdEvent: EventDetails| null;
}
