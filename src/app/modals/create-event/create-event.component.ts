import { CommonModule } from "@angular/common";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule, IonInput, ModalController } from "@ionic/angular";
import { Store } from "@ngrx/store";

import {UserEvent} from "../../pages/events/model/interfaces";
import * as EventsState from '../../pages/events/state';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class CreateEventComponent {
  @ViewChild('input', { read: IonInput }) input?: IonInput;
  eventForm: FormGroup;
  formFieldsMap = [
    { controlName: 'title', placeholder: 'Event Title', icon: 'create-outline', type: 'input' },
    { controlName: 'description', placeholder: 'Event Description', icon: 'document-text-outline', type: 'textarea' },
    { controlName: 'date', placeholder: 'Event Date', icon: 'calendar-number-outline', type: 'datetime' },
    { controlName: 'location', placeholder: 'Location', icon: 'location-outline', type: 'input' },
    { controlName: 'attendees', placeholder: 'Attendees', icon: 'people-outline', type: 'input' },
    { controlName: 'maxAttendees', placeholder: 'Max Attendees', icon: 'people-circle-outline', type: 'input' },
    { controlName: 'eventCost', placeholder: 'Event Cost', icon: 'cash-outline', type: 'input' },
    { controlName: 'eventImage', placeholder: 'Event Image URL', icon: 'image-outline', type: 'input' },
    { controlName: 'eventRating', placeholder: 'Event Rating', icon: 'star-outline', type: 'input' },
    { controlName: 'recommendedAgeGroup', placeholder: 'Recommended Age Group', icon: 'people-outline', type: 'select', options: ['2+', '4-6', '7-9', '10-13', '14-17', '18-25', '26-35', '36-45', '46-55', '56+', 'Custom'] }
  ];

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private store: Store) {
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: [null, Validators.required],
      location: ['', [Validators.required, Validators.maxLength(200)]],
      attendees: ['', [Validators.required, Validators.min(2)]],
      maxAttendees: ['', [Validators.required, Validators.min(10)]],
      eventCost: ['', Validators.required],
      eventImage: [''],
      eventRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      recommendedAgeGroup: [''],
      customAgeGroup: ['']
    });
  }

  createEvent() {
    if (this.eventForm.valid) {
      const event: UserEvent = {
        ...this.eventForm.value,
        organizer: {
          name: 'Ray Clay ',
          avatar: 'assets/images/avatar.jpg'
        }
      };
      this.store.dispatch(EventsState.addEvent({ event }) )
      this.dismissModal();
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
