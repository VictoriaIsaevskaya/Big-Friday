import {CommonModule} from "@angular/common";
import {Component, Input} from '@angular/core';
import {IonicModule} from "@ionic/angular";

import {UserEvent} from "../../../pages/events/model/interfaces";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EventCardComponent {
  @Input() event?: UserEvent
  constructor() { }
  joinEvent(eventId: number) {
  }

  leaveEvent(eventId: number) {
  }

  goToEventDetails(eventId: number) {
  }
}
