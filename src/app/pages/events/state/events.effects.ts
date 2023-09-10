import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {EventsService} from "../list/events.service";

import * as eventActions from "./events.actions";

@Injectable()
export class EventsEffects {

  loadEvent$ = createEffect(() => this.actions$.pipe(
    ofType(eventActions.loadEvent),
    mergeMap(({eventId}) => this.eventsService.getEvent(eventId)
      .pipe(
        map(event => eventActions.loadEventSuccess({event})),
        catchError(error => of(eventActions.loadEventFailure({ error: error.message })))
      ))
  ));

  loadEvents$ = createEffect(() => this.actions$.pipe(
      ofType(eventActions.loadEvents),
      mergeMap(() => this.eventsService.getAll()
        .pipe(
          map(events => eventActions.loadEventsSuccess({events})),
          catchError(error => of(eventActions.loadEventsFailure({ error: error.message })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService,
  ) {}
}
