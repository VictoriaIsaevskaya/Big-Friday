import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

import {AuthState} from "../../../state/auth";
import {LoadEvent, EventsState, UpdateEvent} from '../../../state/events';
import {JoinUserToEvent, UserState} from "../../../state/user";
import {ShouldAuthModalComponent} from "../../auth/should-auth-modal/should-auth-modal.component";
import {EventDetails, Participant} from "../model/interfaces";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage {
  @Select(EventsState.selectedEventDetails) event$!: Observable<EventDetails | null>;
  public selectedEvent: EventDetails;
  public currentUserActivities = this.store.selectSnapshot(UserState.userActivities)


  constructor(private route: ActivatedRoute, private store: Store, private modalController: ModalController, private router: Router) {
    this.store.dispatch(new LoadEvent({eventId: this.route.snapshot.paramMap.get('eventId')}));
  }

  joinEvent(eventId: string) {
    this.store.selectSnapshot(AuthState.isLoggedIn) ? this.addUserToEvent(eventId) : this.openShouldAuthModal;
  }

  addUserToEvent(eventId: string) {
    const currentUser = this.store.selectSnapshot(AuthState.user)
    const { username, about, ageGroup, interests } = this.store.selectSnapshot(UserState.userPreferences)
    let participant: Participant = {
      userId: currentUser.uid,
      username,
      about,
      ageGroup,
      interests
    };
    this.selectedEvent = this.store.selectSnapshot(EventsState.selectedEventDetails)

    this.selectedEvent.participants ? this.selectedEvent.participants.push(participant) : [participant];
    this.store.dispatch(new UpdateEvent({ eventId, eventData: {participants: this.selectedEvent.participants} }));
    this.currentUserActivities.joinedEvents? this.currentUserActivities.joinedEvents.push(eventId) : (this.currentUserActivities.joinedEvents = [eventId])
    this.store.dispatch(new JoinUserToEvent({ userId: currentUser.uid, events: this.currentUserActivities.joinedEvents }));
    this.router.navigate(['chats', eventId])
  }

  async openShouldAuthModal() {
    const modal = await this.modalController.create({
      component: ShouldAuthModalComponent
    });
    return await modal.present();
  }

  leaveEvent(eventId: string) {
    // Logic to leave the event
  }

  isCurrentUserJoined(id: string): boolean {
    return this.currentUserActivities.joinedEvents.includes(id)
  }
}
