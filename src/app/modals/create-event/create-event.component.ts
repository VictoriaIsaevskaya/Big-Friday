import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {IonicModule, IonInput, ModalController} from "@ionic/angular";
import {Store} from "@ngxs/store";

import {ChatDetails, ChatParticipant} from "../../features/chats/model/interfaces/chat.interface";
import {EventDetails, Participant} from "../../features/events/model/interfaces";
import {AuthService} from "../../services/auth.service";
import {FirestoreApiService} from "../../services/firestore-api.service";
import {AddEvent} from "../../state/events";
import {JoinUserToEvent, UserState} from "../../state/user";
import {CREATE_EVENT, CREATE_EVENT_FIELDS_MAP} from "../model/constants";


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEventComponent {
  @ViewChild('input', { read: IonInput }) input?: IonInput;
  @Input() category: string;
  eventForm: FormGroup;
  formFieldsMap= CREATE_EVENT_FIELDS_MAP;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private store: Store,
              private firestoreApiService: FirestoreApiService, private authService: AuthService, private router: Router) {
    this.eventForm = this.formBuilder.group(CREATE_EVENT);
  }

  createEvent() {
    if (this.eventForm.valid) {
      this.createLinkedEvent()
    }
  }

  async createLinkedEvent() {
    const userId = this.authService.getCurrentUserId();
    const { username, about, ageGroup, interests } = this.store.selectSnapshot(UserState.userPreferences)
    let participant: Participant = { userId, username, about, ageGroup, interests };
    const organizer = { name: username, avatar: 'assets/images/avatar.jpg', uid: userId }

    const eventDetails: EventDetails = {
      ...this.eventForm.value,
      organizer,
      category: this.category,
      participants: [participant]
    };
    const { chatName, chatImage: image, title } = this.eventForm.value;
    const name = chatName ? chatName : title;
    let events = this.store.selectSnapshot(UserState.userActivities).joinedEvents

    const participants: ChatParticipant[] = [{ userId, unreadMessagesCount: 0}];

    const {id: eventId} = await this.firestoreApiService.createEvent(eventDetails);
    const chatDetails: ChatDetails = { name, image, participants };
    const {id: chatId} = await this.firestoreApiService.createChatForEvent(eventId, chatDetails);
    await this.firestoreApiService.linkEventWithChat(eventId, chatId);
    this.store.dispatch(new AddEvent({ event: eventDetails }));
    events ? events.push({eventId, chatId}) : (events = [{eventId, chatId}])

    this.store.dispatch(new JoinUserToEvent({ userId, events }));
    await this.router.navigate(['chats', chatId])
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
