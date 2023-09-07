import { CommonModule } from "@angular/common";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { IonicModule, IonInput, ModalController } from "@ionic/angular";
import {Store} from "@ngrx/store";

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
    { controlName: 'maxAttendees', placeholder: 'Max Attendees', icon: 'people-circle-outline', type: 'input' }
  ];

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private store: Store) {
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: [null, Validators.required],
      location: ['', [Validators.required, Validators.maxLength(200)]],
      attendees: ['', [Validators.required, Validators.min(1)]],
      maxAttendees: ['', [Validators.required, Validators.min(1)]],
      isJoined: [false]
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
