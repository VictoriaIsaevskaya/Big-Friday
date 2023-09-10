import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserEvent } from "../../pages/events/model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private mockEvents: UserEvent[] = [
    {
      id: 1,
      title: 'Bowling Night Out',
      description: 'Join us for a fun night of bowling and socializing! This event is recommended for ages 18-35, but everyone is welcome.',
      date: new Date(2023, 8, 30, 19, 0),
      location: 'Bowling Alley, Main Street',
      attendees: 5,
      maxAttendees: 20,
      organizer: {
        name: 'John Doe',
        avatar: 'assets/images/avatar.jpg',
      },
      ageGroup: '18-35',
      language: 'English',
      cost: 10,
      isJoined: false,
    },
    {
      id: 2,
      title: 'Bowling & Beer',
      description: "Bowling for newbies. This event is best suited for ages 26-45, but don't let that stop you from joining!",
      date: new Date(2023, 9, 5, 18, 30),
      location: 'Winery, Vine Street',
      attendees: 10,
      maxAttendees: 25,
      organizer: {
        name: 'Jane Smith',
        avatar: 'assets/images/avatar.jpg',
      },
      ageGroup: '26-45',
      language: 'English',
      cost: 15,
      isJoined: true,
    },
  ];



  constructor() { }

  getAll(): Observable<UserEvent[]> {
    return of(this.mockEvents);
  }

  addEvent(event: UserEvent): void {
    this.mockEvents.push(event);
  }
}
