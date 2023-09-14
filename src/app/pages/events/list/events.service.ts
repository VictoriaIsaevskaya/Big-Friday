import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {EventDetails, EventSummary} from "../model/interfaces";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private mockEventDetails: EventDetails[] = [
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
      isJoined: true,
      rules: [
        "No outside food or drinks allowed.",
        "Bowling shoes are mandatory. You can rent them at the venue.",
        "Respect other participants and maintain a friendly atmosphere.",
        "Any kind of aggressive behavior will lead to immediate expulsion."
      ],
      additionalInfo: "We have a special guest, professional bowler John Doe, who will be giving a short demo and some tips. Also, the first round of beer is on the house!"
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
      isJoined: false,
      rules: [
        "No outside food or drinks allowed.",
        "Bowling shoes are mandatory. You can rent them at the venue.",
        "Respect other participants and maintain a friendly atmosphere.",
        "Any kind of aggressive behavior will lead to immediate expulsion."
      ],
      additionalInfo: "We have a special guest, professional bowler John Doe, who will be giving a short demo and some tips. Also, the first round of beer is on the house!"
    },
  ]

  private mockEventsSummary: EventSummary[] = [
    {
      id: 1,
      title: 'Bowling Night Out',
      description: 'Join us for a fun night of bowling and socializing! This event is recommended for ages 18-35, but everyone is welcome.',
      date: new Date(2023, 8, 30, 19, 0),
      location: 'Bowling Alley, Main Street',
      attendees: 5,
      maxAttendees: 20,
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
      isJoined: true,
    },
  ];

  constructor() { }

  getAll(): Observable<EventSummary[]> {
    return of(this.mockEventsSummary);
  }

  addEvent(event: EventDetails): void {
    this.mockEventsSummary.push(event);
  }

  getEvent(id: string): Observable<EventDetails | null> {
    // @ts-ignore
    return of(this.mockEventDetails.find(event => event.id == id));
  }
}
