export interface UserPreferences {
  username?: string;
  avatar?: string;
  about?: string;
  preferredLanguages?: string[];
  interests?: string[];
  ageGroup?: string;
}

export interface IUserDetails {
  email?: string;
  name?: string;
  imageUrl?: string;
  password?: string;
}

export interface SignUpDetails {
  email?: string;
  typeOfSignUp?: string;
  password?: string;
}

export interface UserInformation {
  username?: string;
  avatar?: string;
  birthday?: string;
  gender?: string;
  location?: string;
  interests?: string[];
  isNotifications: boolean;
}
