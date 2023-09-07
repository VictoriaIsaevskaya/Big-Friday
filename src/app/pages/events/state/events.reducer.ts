import { createReducer, on } from '@ngrx/store';

import { EventsState } from '../model/interfaces';

import { loadEvents, loadEventsSuccess, loadEventsFailure, addEvent} from "./events.actions";

export const initialState: EventsState = {
  events: [],
  loadingStatus: 'idle',
  error: null,
  selectedEvent: null,
  createdEvent: null
};

export const eventsReducer = createReducer(
  initialState,
  on(loadEvents, state => ({ ...state, loadingStatus: 'loading' })),
  on(loadEventsSuccess, (state, { events }) => ({ ...state, loadingStatus: 'loaded', events })),
  on(loadEventsFailure, (state, { error }) => ({ ...state, loadingStatus: 'error', error })),
  on(addEvent, (state, { event }) => ({ ...state, events: [...state.events, event], createdEvent: event }))
);
