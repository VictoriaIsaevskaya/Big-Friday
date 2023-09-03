import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModalController, NavController} from "@ionic/angular";
import {UserEvent} from "./model/interfaces";
import {CreateEventComponent} from "../../shared/components/create-event/create-event.component";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.page.html',
  styleUrls: ['./events-list.page.scss'],
})
export class EventsListPage implements OnInit {
  pageTitle?: string;
  activityType?: string | null;
  eventsList: UserEvent[] = [
    {
      id: 1,
      title: 'Bowling Night Out',
      description: 'Join us for a fun night of bowling and socializing!',
      date: new Date(2023, 8, 30, 19, 0),
      location: 'Bowling Alley, Main Street',
      attendees: 5,
      maxAttendees: 20,
      organizer: {
        name: 'John Doe',
        avatar: 'assets/images/avatar.jpg',
      },
      isJoined: false,
    },
    {
      id: 2,
      title: 'Bowling & Beer',
      description: 'Bowling for newbees.',
      date: new Date(2023, 9, 5, 18, 30),
      location: 'Winery, Vine Street',
      attendees: 10,
      maxAttendees: 25,
      organizer: {
        name: 'Jane Smith',
        avatar: 'assets/images/avatar.jpg',
      },
      isJoined: true,
    },
  ];
  constructor(private navCtrl: NavController, private route: ActivatedRoute, private modalController: ModalController) {
    this.activityType = this.route.snapshot.paramMap.get('activityType');
    if (this.activityType) {
      const decodedActivityType = decodeURIComponent(this.activityType);
      this.pageTitle = this.parseActivityType(decodedActivityType);
    }
  }

  ngOnInit() {
    return
  }

  private parseActivityType(activityType: string): string {
    return activityType.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  goBack() {
    this.navCtrl.back();
  }

  createEvent() {
  }

  async openCreateEventModal() {
    const modal = await this.modalController.create({
      component: CreateEventComponent
    });
    return await modal.present();
  }
}
