import {Injectable} from "@angular/core";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap} from "rxjs";
import {catchError} from "rxjs/operators";

import {EventDetails} from "../../features/events/model/interfaces";
import {EventsService} from "../../services/events.service";
import {FirestoreApiService} from "../../services/firestore-api.service";

import {
  AddEvent,
  LoadEvent,
  LoadEventFailure,
  LoadEvents,
  LoadEventsFailure,
  LoadEventsSuccess,
  LoadEventSuccess, UpdateEvent
} from "./events.actions";

export interface EventsStateModel {
  events: EventDetails[];
  loadingStatus: string;
  error: string | null;
  selectedEvent: EventDetails | null;
  createdEvent: EventDetails | null;
}
@Injectable()
@State<EventsStateModel>({
  name: 'events',
  defaults: {
    events: [],
    loadingStatus: '',
    error: null,
    selectedEvent: null,
    createdEvent: null
  }
})
export class EventsState {
  constructor(private eventsService: EventsService, private firestoreApiService: FirestoreApiService) {
  }
  @Selector()
  static allEvents(state: EventsStateModel) {
    return state.events;
  }

  @Selector()
  static selectedEventDetails(state: EventsStateModel) {
    return state.selectedEvent;
  }

  @Selector()
  static createdEvent(state: EventsStateModel) {
    return state.createdEvent;
  }

  @Selector()
  static loadingStatus(state: EventsStateModel) {
    return state.loadingStatus;
  }

  @Action(LoadEvents)
  loadEvents(ctx: StateContext<EventsStateModel>) {
    ctx.patchState({ loadingStatus: 'loading' });
    return this.eventsService.getAll().pipe(
      tap((events) => {
        ctx.dispatch(new LoadEventsSuccess({ events }));
      }),
      catchError((error) => {
        ctx.dispatch(new LoadEventsFailure({ error: error.message }));
        throw error;
      })
    );
  }

  @Action(LoadEvent)
  loadEvent(ctx: StateContext<EventsStateModel>, action: LoadEvent) {
    ctx.patchState({ loadingStatus: 'loading' });
    const filteredEvent = ctx.getState().events.find(event => event.id === action.payload.eventId);
    return filteredEvent ? ctx.dispatch(new LoadEventSuccess({ event: filteredEvent })) : this.eventsService.getEvent(action.payload.eventId).pipe(
      tap((event) => {
        ctx.dispatch(new LoadEventSuccess({ event: {...event, id: action.payload.eventId }}));
      }),
      catchError((error) => {
        ctx.dispatch(new LoadEventFailure({ error: error.message }));
        throw error;
      })
    );
  }

  @Action(LoadEventsSuccess)
  onLoadEventsSuccess(ctx: StateContext<EventsStateModel>, action: LoadEventsSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loadingStatus: 'loaded',
      events: action.payload.events
    });
  }

  @Action(LoadEventsFailure)
  onLoadEventsFailure(ctx: StateContext<EventsStateModel>, action: LoadEventsFailure) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loadingStatus: 'error',
      error: action.payload.error
    });
  }

  @Action(LoadEventSuccess)
  onLoadEventSuccess(ctx: StateContext<EventsStateModel>, action: LoadEventSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loadingStatus: 'loaded',
      selectedEvent: action.payload.event
    });
  }

  @Action(LoadEventFailure)
  onLoadEventFailure(ctx: StateContext<EventsStateModel>, action: LoadEventFailure) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loadingStatus: 'error',
      error: action.payload.error,
      selectedEvent: null
    });
  }

  @Action(AddEvent)
  onAddEvent(ctx: StateContext<EventsStateModel>, action: AddEvent) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      events: [...state.events, action.payload.event],
      createdEvent: action.payload.event
    });
  }

  @Action(UpdateEvent)
  updateEvent(ctx: StateContext<EventsStateModel>, action: UpdateEvent) {
    return this.firestoreApiService.updateEvent(action.payload.eventId, action.payload.eventData).then(() => {
      const state = ctx.getState();
      const updatedEvents = state.events.map(event =>
        event.id === action.payload.eventId ? { ...event, ...action.payload.eventData } : event
      );
      ctx.setState({
        ...state,
        events: updatedEvents
      });
    });
  }

}
