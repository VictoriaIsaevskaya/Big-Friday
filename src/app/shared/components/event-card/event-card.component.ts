import {CommonModule} from "@angular/common";
import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";

import {EventDetails} from "../../../features/events/model/interfaces";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EventCardComponent {
  @Input() event?: EventDetails
  constructor(private router: Router) { }

  openEventDetails(eventId: string) {
    this.router.navigate(['event-details', eventId]);
  }
}
