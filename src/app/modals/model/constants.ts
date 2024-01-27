import {Validators} from "@angular/forms";

export const CREATE_EVENT = {
  title: ['', [Validators.required, Validators.maxLength(100)]],
  description: ['', [Validators.required, Validators.maxLength(500)]],
  date: [null, Validators.required],
  location: ['', [Validators.required, Validators.maxLength(200)]],
  maxAttendees: ['', [Validators.required]],
  eventCost: [''],
  recommendedAgeGroup: [''],
  customAgeGroup: [''],
  language: [''],
  rules: [''],
  additionalInfo: [],
  chatName: [''],
  chatImage: [''],
}

export const CREATE_EVENT_FIELDS_MAP = [
  { controlName: 'title', placeholder: 'Event Title', icon: 'create-outline', type: 'input' },
  { controlName: 'description', placeholder: 'Event Description', icon: 'document-text-outline', type: 'textarea' },
  { controlName: 'date', placeholder: 'Event Date', icon: 'calendar-number-outline', type: 'datetime' },
  { controlName: 'location', placeholder: 'Location', icon: 'location-outline', type: 'input' },
  { controlName: 'maxAttendees', placeholder: 'Max Attendees', icon: 'people-circle-outline', type: 'input' },
  { controlName: 'eventCost', placeholder: 'Event Cost', icon: 'cash-outline', type: 'input' },
  { controlName: 'language', placeholder: 'Language', icon: 'language-outline', type: 'select', options: ['English', 'Russian', 'French', 'Spanish', 'German', 'Polish', 'See additional info'], multiple: true, },
  { controlName: 'recommendedAgeGroup', placeholder: 'Recommended Age Group', icon: 'people-outline', type: 'select', options: ['2+', '4-6', '7-9', '10-13', '14-17', '18-25', '26-35', '36-45', '46-55', '56+', 'See additional info'] },
  { controlName: 'rules', placeholder: 'Rules', icon: 'reader-outline', type: 'textarea' },
  { controlName: 'additionalInfo', placeholder: 'Additional Info', icon: 'information-circle-outline', type: 'textarea' },
  { controlName: 'chatName', placeholder: 'Chat Name', icon: 'chatbubbles-outline', type: 'input' },
  { controlName: 'chatImage', placeholder: 'Chat Photo URL', icon: 'image-outline', type: 'input' },
]
