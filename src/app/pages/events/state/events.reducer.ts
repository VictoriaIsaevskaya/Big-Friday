import { createReducer, on } from '@ngrx/store';

import { EventsState } from '../model/interfaces/interfaces';

import {
  loadEvents,
  loadEventsSuccess,
  loadEventsFailure,
  addEvent,
  loadEvent,
  loadEventFailure, loadEventSuccess
} from "./events.actions";

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
  on(loadEvent, state => ({ ...state, loadingStatus: 'loading'})),
  on(loadEventsSuccess, (state, { events }) => ({ ...state, loadingStatus: 'loaded', events })),
  on(loadEventSuccess, (state, { event }) => ({ ...state, loadingStatus: 'loaded', selectedEvent: event })),
  on(loadEventsFailure, (state, { error }) => ({ ...state, loadingStatus: 'error', error })),
  on(loadEventFailure, (state, { error }) => ({ ...state, loadingStatus: 'error', error })),
  on(addEvent, (state, { event }) => ({ ...state, events: [...state.events, event], createdEvent: event }))
);
