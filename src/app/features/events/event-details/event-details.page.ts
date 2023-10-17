import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

import {AuthState} from "../../../state/auth";
import { LoadEvent, EventsState } from '../../../state/events';
import {ShouldAuthModalComponent} from "../../auth/should-auth-modal/should-auth-modal.component";
import { EventDetails } from "../model/interfaces";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage {

  @Select(EventsState.eventDetails) event$!: Observable<EventDetails | null>;

  constructor(private store: Store, private modalController: ModalController, private router: Router) {
    this.store.dispatch(new LoadEvent({eventId: '2'}));
  }

  joinEvent(eventId: number) {
    this.store.selectSnapshot(AuthState.isLoggedIn) ? this.router.navigate(['chats', eventId]) : this.openShouldAuthModal;
  }

  async openShouldAuthModal() {
    const modal = await this.modalController.create({
      component: ShouldAuthModalComponent
    });
    return await modal.present();
  }

  leaveEvent(eventId: number) {
    // Logic to leave the event
  }
}
