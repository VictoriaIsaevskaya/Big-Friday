import {createAction, props} from '@ngrx/store';

import {EventDetails, EventSummary} from "../model/interfaces";

export const loadEvents = createAction('[Events] Load Events');
export const loadEventsSuccess = createAction('[Events] Load Events Success', props<{ events: EventSummary[] }>());
export const loadEventsFailure = createAction('[Events] Load Events Failure', props<{ error: string }>());
export const addEvent = createAction('[Events] Add Event', props<{ event: EventDetails }>());

export const loadEvent = createAction('[Events] Load Event', props<{ eventId: string }>());
export const loadEventSuccess = createAction('[Events] Load Event Success', props<{ event: EventDetails | null }>());
export const loadEventFailure = createAction('[Events] Load Event Failure', props<{ error: string }>());
