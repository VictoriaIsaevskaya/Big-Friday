import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {EventDetails} from "../model/interfaces";
import * as EventsState from '../state';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event$: Observable<EventDetails | null>;

  constructor(private store: Store) {
    this.store.dispatch(EventsState.loadEvent({eventId: '2'}))
    this.event$ = this.store.select(EventsState.selectEventDetails);
    this.event$.subscribe(data => console.log(data))
  }

  ngOnInit() {

  }

}
