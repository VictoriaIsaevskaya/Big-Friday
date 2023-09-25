export const preferenceFields = [
  { controlName: 'username', placeholder: 'Username', type: 'input', icon: 'person-outline', isEditing: false },
  { controlName: 'email', placeholder: 'Email', type: 'input', icon: 'mail-outline', isEditing: false },
  { controlName: 'about', placeholder: 'About You', type: 'textarea', icon: 'information-circle-outline', isEditing: false },
  { controlName: 'preferredLanguage', placeholder: 'Preferred Language', type: 'select', icon: 'language-outline', options: ['English', 'Russian', 'Polish', 'Spanish', 'French'], multiple: true, isEditing: false },
  { controlName: 'interests', placeholder: 'Interests', type: 'select', icon: 'heart-outline', options: ['Bowling', 'Cinema', 'Theatre', 'Hiking', 'Reading'], multiple: true, isEditing: false },
  { controlName: 'ageGroup', placeholder: 'Age Group', type: 'select', icon: 'calendar-outline', options: ['18-25', '26-35', '36-45', '46-55', '56+'], isEditing: false }
];

export const registerFields: any = preferenceFields.concat([
  { controlName: 'password', placeholder: 'Password', type: 'password', icon: 'lock-closed-outline', isEditing: false },
  { controlName: 'confirmPassword', placeholder: 'Confirm Password', type: 'password', icon: 'lock-closed-outline', isEditing: false },
])
