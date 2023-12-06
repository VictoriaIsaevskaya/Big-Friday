import {UserPreferences} from "../../../modals/model/interfaces";

export interface UserAuthInfo {
  uid?: string;
  displayName?: string | null;
  email?: string | null;
}

export interface User extends UserPreferences, UserActivities {
}

export interface JoinedEvent {
  eventId: string;
  chatId: string;
}

export interface UserActivities {
  joinedEvents: JoinedEvent[];
  pastEvents: string[];
  notifications: any;
}
