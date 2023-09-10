import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EventsState } from "../model/interfaces";

export const selectEventsState = createFeatureSelector<EventsState>('events');

export const selectAllEvents = createSelector(
  selectEventsState,
  (state: EventsState) => state.events
);

export const selectEventDetails = createSelector(
  selectEventsState,
  (state: EventsState) => state.selectedEvent
);

export const selectCreatedEvent = createSelector(
  selectEventsState,
  (state: EventsState) => state.createdEvent
);

export const selectLoadingStatus = createSelector(
  selectEventsState,
  (state: EventsState) => state.loadingStatus
);
