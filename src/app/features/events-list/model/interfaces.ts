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
