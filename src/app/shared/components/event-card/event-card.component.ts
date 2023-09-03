import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {UserEvent} from "../../../features/events-list/model/interfaces";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EventCardComponent implements OnInit {
  @Input() event?: UserEvent
  constructor() { }

  ngOnInit() {}
  joinEvent(eventId: number) {
  }

  leaveEvent(eventId: number) {
  }

  goToEventDetails(eventId: number) {
  }
}
