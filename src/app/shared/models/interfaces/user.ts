export interface User {
  uid: string;
  username?: string;
  displayName: string | null;
  email: string | null;
  avatar?: string;
  password?: string;
  confirmPassword?: string;
  about?: string;
  preferredLanguage?: string;
  interests?: string[];
  ageGroup?: string;
}
