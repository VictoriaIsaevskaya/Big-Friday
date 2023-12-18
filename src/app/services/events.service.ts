import { Injectable } from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

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

  getEventsByCategory(category: string) {
    const queryFn = (ref) => ref.where('category', '==', category);
    return this.firestoreApiService.collectionDataQuery('events', queryFn)
      .pipe(
        catchError(error => throwError(() => new Error(error)))
      );
  }

  getEvent(id: string): Observable<EventDetails | null> {
    return this.firestoreApiService.getDocById(`events/${id}`).pipe(
      map(value => value as EventDetails)
    );
  }
}
