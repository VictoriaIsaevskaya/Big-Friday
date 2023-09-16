export interface User {
  username: string;
  email: string;
  avatar?: string;
  password: string;
  confirmPassword: string;
  about: string;
  preferredLanguage: string;
  interests: string[];
  ageGroup: string;
}
