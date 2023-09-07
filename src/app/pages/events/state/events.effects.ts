import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {EventsService} from "../../../core/services/events.service";

import { loadEvents, loadEventsSuccess, loadEventsFailure } from "./events.actions";

@Injectable()
export class EventsEffects {

  loadEvents$ = createEffect(() => this.actions$.pipe(
      ofType(loadEvents),
      mergeMap(() => this.eventsService.getAll()
        .pipe(
          map(events => loadEventsSuccess({events})),
          catchError(error => of(loadEventsFailure({ error: error.message })))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}
}
