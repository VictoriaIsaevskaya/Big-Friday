export interface PreferenceField {
  controlName: string;
  placeholder: string;
  type: string;
  icon: string;
  isEditing: boolean;
  options?: string[];
  multiple?: boolean;
  isOverflowing?: boolean;
}

export const preferenceFields: PreferenceField[] = [
  { controlName: 'username', placeholder: 'Username', type: 'input', icon: 'person-outline', isEditing: false, isOverflowing: false },
  { controlName: 'about', placeholder: 'About You', type: 'textarea', icon: 'information-circle-outline', isEditing: false, isOverflowing: false },
  { controlName: 'preferredLanguages', placeholder: 'Preferred Languages', type: 'select', icon: 'language-outline', options: ['English', 'Russian', 'Polish', 'Spanish', 'French'], multiple: true, isEditing: false, isOverflowing: false },
  { controlName: 'interests', placeholder: 'Interests', type: 'select', icon: 'heart-outline', options: ['Bowling', 'Cinema', 'Theatre', 'Hiking', 'Reading'], multiple: true, isEditing: false, isOverflowing: false },
  { controlName: 'ageGroup', placeholder: 'Age Group', type: 'select', icon: 'calendar-outline', options: ['18-25', '26-35', '36-45', '46-55', '56+'], isEditing: false, isOverflowing: false }
];

export const registerFields: PreferenceField[] = preferenceFields.concat([
  { controlName: 'email', placeholder: 'Email', type: 'input', icon: 'mail-outline', isEditing: false },
  { controlName: 'password', placeholder: 'Password', type: 'password', icon: 'lock-closed-outline', isEditing: false },
  // { controlName: 'confirmPassword', placeholder: 'Confirm Password', type: 'password', icon: 'lock-closed-outline', isEditing: false },
])
