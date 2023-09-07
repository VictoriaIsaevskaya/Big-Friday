import { createAction, props } from '@ngrx/store';

import { UserEvent } from "../model/interfaces";

export const loadEvents = createAction('[Events] Load Events');
export const loadEventsSuccess = createAction('[Events] Load Events Success', props<{ events: UserEvent[] }>());
export const loadEventsFailure = createAction('[Events] Load Events Failure', props<{ error: string }>());
export const addEvent = createAction('[Events] Add Event', props<{ event: UserEvent }>());
