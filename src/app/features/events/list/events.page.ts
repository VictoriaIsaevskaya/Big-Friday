import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";

import {CreateEventComponent} from "../../../modals/create-event/create-event.component";
import {EventsState, LoadEventsByCategory} from '../../../state/events';
import {eventCategories} from "../model/helpers/event-categories";
import {EventDetails} from "../model/interfaces";

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  pageTitle?: string;
  activityType?: string | null;

  @Select(EventsState.categoryEvents) events$!: Observable<EventDetails[]>;

  constructor(private route: ActivatedRoute, private modalController: ModalController, private store: Store) {
    this.activityType = this.route.snapshot.paramMap.get('activityType');
    if (this.activityType) {
      const decodedActivityType = decodeURIComponent(this.activityType);
      this.pageTitle = this.parseActivityType(decodedActivityType);
    }
  }

  ngOnInit() {
    this.store.dispatch(new LoadEventsByCategory({category: this.activityType}));
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
    return '/active';
  }

  async openCreateEventModal() {
    const modal = await this.modalController.create({
      component: CreateEventComponent,
      componentProps: {
        'category': this.activityType
      }
    });
    return await modal.present();
  }
}
