export interface UserEvent {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  attendees: number;
  maxAttendees: number;
  organizer: {
    name: string;
    avatar: string;
  };
  isJoined: boolean;
}

export interface EventsState {
  events: UserEvent[];
  loadingStatus: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
  selectedEvent: UserEvent | null;
  createdEvent: UserEvent| null;
}
