import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {CreateEventComponent} from "../../../modals/create-event/create-event.component";
import * as EventsState from '../../../state/events';
import {eventCategories} from "../model/helpers/event-categories";
import {EventSummary} from "../model/interfaces";

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  pageTitle?: string;
  activityType?: string | null;
  events$?: Observable<EventSummary[]>;

  constructor(private route: ActivatedRoute, private modalController: ModalController, private store: Store) {
    this.activityType = this.route.snapshot.paramMap.get('activityType');
    if (this.activityType) {
      const decodedActivityType = decodeURIComponent(this.activityType);
      this.pageTitle = this.parseActivityType(decodedActivityType);
    }

  }

  ngOnInit() {
    this.store.dispatch(EventsState.loadEvents())
    this.events$ = this.store.select(EventsState.selectAllEvents);
  }

  private parseActivityType(activityType: string): string {
    return activityType.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  public getActivityCategory(): string {
    if (this.activityType) {
      for (const category in eventCategories) {
        if (eventCategories[category].includes(this.activityType.toLowerCase())) {
          return `events/${category}`;
        }
      }
    }
    return '/events/active';
  }

  async openCreateEventModal() {
    const modal = await this.modalController.create({
      component: CreateEventComponent
    });
    return await modal.present();
  }
}
