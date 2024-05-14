export interface UserPreferences {
  username?: string;
  confirmPassword?: string;
  avatar?: string;
  about?: string;
  preferredLanguages?: string[];
  interests?: string[];
  ageGroup?: string;
}

export interface IUserDetails {
  email?: string;
  name?: string;
  password?: string;
  imageUrl?: string;
}

export interface SignUpDetails extends IUserDetails {
  typeOfSignUp?: string;
}

export interface UserInformation {
  username: string;
  avatar?: string;
  birthday: string;
  gender: string;
  location: string;
  interests?: string[];
  isNotifications: boolean;
}
