import {Injectable} from "@angular/core";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap} from "rxjs";
import {catchError} from "rxjs/operators";

import {EventDetails, EventSummary} from "../../pages/events/model/interfaces";
import {EventsService} from "../../services/events.service";

import {
  AddEvent,
  LoadEvent,
  LoadEventFailure,
  LoadEvents,
  LoadEventsFailure,
  LoadEventsSuccess,
  LoadEventSuccess
} from "./events.actions";

export interface EventsStateModel {
  events: EventSummary[];
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
  constructor(private eventsService: EventsService) {
  }
  @Selector()
  static allEvents(state: EventsStateModel) {
    return state.events;
  }

  @Selector()
  static eventDetails(state: EventsStateModel) {
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
    console.log('loadEvents action works')
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

    return this.eventsService.getEvent(action.payload.eventId).pipe(
      tap((event) => {
        ctx.dispatch(new LoadEventSuccess({ event }));
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

}
