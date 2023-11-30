import {ChangeDetectorRef, Component, DestroyRef, inject, OnDestroy} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Router} from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import {Observable, tap} from "rxjs";

import {AuthState} from "../../../state/auth";
import {LoadEvent, EventsState, UpdateEvent, UnselectEvent} from '../../../state/events';
import {JoinUserToEvent, UserActivities, UserState} from "../../../state/user";
import {ShouldAuthModalComponent} from "../../auth/should-auth-modal/should-auth-modal.component";
import {EventDetails, Participant} from "../model/interfaces";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnDestroy {
  @Select(EventsState.selectedEventDetails) event$!: Observable<EventDetails | null>;
  public selectedEvent: EventDetails;
  @Select(UserState.userActivities) currentUserActivities$!: Observable<UserActivities | null>;
  public currentUserActivities: UserActivities;
  private destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute, private store: Store, private modalController: ModalController, private router: Router, private cdr: ChangeDetectorRef) {
    this.store.dispatch(new LoadEvent({eventId: this.route.snapshot.paramMap.get('eventId')}));
    this.event$.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((event) => this.selectedEvent = event)
    ).subscribe()
    this.currentUserActivities$.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((event) => this.currentUserActivities = event)
    ).subscribe()
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

    this.selectedEvent.participants ? this.selectedEvent.participants.push(participant) : [participant];
    this.store.dispatch(new UpdateEvent({ eventId, eventData: {participants: this.selectedEvent.participants} }));
    this.currentUserActivities.joinedEvents ? this.currentUserActivities.joinedEvents.push(eventId) : (this.currentUserActivities.joinedEvents = [eventId])
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

    const currentUser = this.store.selectSnapshot(AuthState.user)
    const participants = this.selectedEvent.participants.filter(participant => participant.userId !== currentUser.uid)
    this.store.dispatch(new JoinUserToEvent({ userId: currentUser.uid, events: this.currentUserActivities.joinedEvents.filter(id => eventId !== id) }));
    this.store.dispatch(new UpdateEvent({ eventId, eventData: {participants} }));
  }

  get isCurrentUserJoined(): boolean {
    return this.currentUserActivities.joinedEvents.includes(this.selectedEvent?.id)
  }

  ngOnDestroy() {
    this.store.dispatch(new UnselectEvent())

  }
}
