import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {PreferencesComponent} from "../../../modals/preferences/preferences.component";
import * as EventsState from '../../../state/events';
import {EventDetails} from "../model/interfaces";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event$: Observable<EventDetails | null>;

  constructor(private store: Store, private modalController: ModalController) {
    this.store.dispatch(EventsState.loadEvent({eventId: '2'}))
    this.event$ = this.store.select(EventsState.selectEventDetails);
  }

  ngOnInit() { }

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
