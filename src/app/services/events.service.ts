import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';

import {EventDetails} from "../features/events/model/interfaces";

import {FirestoreApiService} from "./firestore-api.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private firestoreApiService: FirestoreApiService) { }

  getAll(): Observable<EventDetails[]> {
    return this.firestoreApiService.collectionDataQuery('events');
  }

  addEvent(event: EventDetails): Promise<void> {
    return this.firestoreApiService.createEvent(event);
  }

  getEvent(id: string): Observable<EventDetails | null> {
    return this.firestoreApiService.getDocById(`events/${id}`).pipe(
      map(value => value as EventDetails)
    );
  }
}
