import { CommonModule } from "@angular/common";
import {Component, Input, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule, IonInput, ModalController } from "@ionic/angular";
import { Store } from "@ngxs/store";

import {EventDetails} from "../../features/events/model/interfaces";
import {AddEvent} from "../../state/events";


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class CreateEventComponent {
  @ViewChild('input', { read: IonInput }) input?: IonInput;
  @Input() category: string;
  eventForm: FormGroup;
  formFieldsMap = [
    { controlName: 'title', placeholder: 'Event Title', icon: 'create-outline', type: 'input' },
    { controlName: 'description', placeholder: 'Event Description', icon: 'document-text-outline', type: 'textarea' },
    { controlName: 'date', placeholder: 'Event Date', icon: 'calendar-number-outline', type: 'datetime' },
    { controlName: 'location', placeholder: 'Location', icon: 'location-outline', type: 'input' },
    { controlName: 'attendees', placeholder: 'Attendees', icon: 'people-outline', type: 'input' },
    { controlName: 'maxAttendees', placeholder: 'Max Attendees', icon: 'people-circle-outline', type: 'input' },
    { controlName: 'eventCost', placeholder: 'Event Cost', icon: 'cash-outline', type: 'input' },
    { controlName: 'language', placeholder: 'Language', icon: 'language-outline', type: 'select', options: ['English', 'Russian', 'French', 'Spanish', 'German', 'Polish', 'See additional info'] },
    { controlName: 'recommendedAgeGroup', placeholder: 'Recommended Age Group', icon: 'people-outline', type: 'select', options: ['2+', '4-6', '7-9', '10-13', '14-17', '18-25', '26-35', '36-45', '46-55', '56+', 'See additional info'] },
    { controlName: 'rules', placeholder: 'Rules', icon: 'reader-outline', type: 'textarea' },
    { controlName: 'additionalInfo', placeholder: 'Additional Info', icon: 'information-circle-outline', type: 'textarea' },
  ];

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private store: Store) {
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: [null, Validators.required],
      location: ['', [Validators.required, Validators.maxLength(200)]],
      attendees: ['', [Validators.required]],
      maxAttendees: ['', [Validators.required]],
      eventCost: [''],
      recommendedAgeGroup: [''],
      customAgeGroup: [''],
      language: [''],
      rules: [''],
      additionalInfo: []
    });
  }

  createEvent() {
    if (this.eventForm.valid) {
      const event: EventDetails = {
        ...this.eventForm.value,
        organizer: {
          name: 'Ray Clay ',
          avatar: 'assets/images/avatar.jpg'
        },
        category: this.category,
      };
      this.store.dispatch(new AddEvent({ event }) )
      this.dismissModal();
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
