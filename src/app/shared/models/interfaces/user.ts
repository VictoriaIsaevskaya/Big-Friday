import {UserPreferences} from "../../../modals/model/interfaces";

export interface UserAuthInfo {
  uid?: string;
  displayName?: string | null;
  email?: string | null;
}

export interface User extends UserPreferences {
  joinedEvents: string[];
  pastEvents: string[];
  notifications: any;
}
