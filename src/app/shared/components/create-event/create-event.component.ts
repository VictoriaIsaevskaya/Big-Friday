import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {IonicModule, IonInput, ModalController} from "@ionic/angular";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
})
export class CreateEventComponent implements AfterViewInit{
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


  constructor(private formBuilder: FormBuilder, private modalController: ModalController) {
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

  ngAfterViewInit() {
    const nativeInput = this.input?.getInputElement();
    nativeInput?.then(inputElement => {
      inputElement.setAttribute('mask', '00/00/0000');
    });
  }

  createEvent() {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      this.dismissModal();
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
