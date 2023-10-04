import { Component } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

import { PreferencesComponent } from "../../../modals/preferences/preferences.component";
import { LoadEvent, EventsState } from '../../../state/events/';
import { EventDetails } from "../model/interfaces";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage {

  @Select(EventsState.eventDetails) event$!: Observable<EventDetails | null>;

  constructor(private store: Store, private modalController: ModalController) {
    this.store.dispatch(new LoadEvent({eventId: '2'}));
  }

  async joinEvent(eventId: number) {
    const modal = await this.modalController.create({
      component: PreferencesComponent
    });
    return await modal.present();
  }

  leaveEvent(eventId: number) {
    // Logic to leave the event
  }
}
