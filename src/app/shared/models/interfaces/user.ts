export interface User {
  uid: string;
  username?: string;
  displayName: string | null;
  email: string | null;
  avatar?: string;
  about?: string;
  preferredLanguage?: string;
  interests?: string[];
  ageGroup?: string;
  joinedEvents?: string[];
  pastEvents?: string[];
  notifications?: any;
}
