import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {from, mergeMap, switchMap, tap, throwError, toArray} from "rxjs";
import {catchError} from "rxjs/operators";

import {EventDetails} from "../../features/events/model/interfaces";
import {EventsService} from "../../services/events.service";
import {FirestoreApiService} from "../../services/firestore-api.service";

import {
  AddEvent, DeleteEvent, DeleteEventFailure, DeleteEventSuccess, LoadAllEvents, LoadAllEventsSuccess,
  LoadEvent,
  LoadEventFailure,
  LoadEventsByCategory,
  LoadEventsFailure,
  LoadEventsSuccess,
  LoadEventSuccess, UnselectEvent, UpdateEvent
} from "./events.actions";

export interface EventsStateModel {
  categoryEvents: EventDetails[];
  allEvents: EventDetails[];
  loadingStatus: string;
  error: string | null;
  selectedEvent: EventDetails | null;
  createdEvent: EventDetails | null;
}
@Injectable()
@State<EventsStateModel>({
  name: 'events',
  defaults: {
    categoryEvents: [],
    allEvents: [],
    loadingStatus: '',
    error: null,
    selectedEvent: null,
    createdEvent: null
  }
})
export class EventsState {
  constructor(private eventsService: EventsService, private router: Router, private firestoreApiService: FirestoreApiService) {
  }
  @Selector()
  static categoryEvents(state: EventsStateModel) {
    return state.categoryEvents;
  }

  @Selector()
  static allEvents(state: EventsStateModel) {
    return state.allEvents;
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
  static eventCountsByCategory(state: EventsStateModel) {
    return state.allEvents.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});
  }

  @Selector()
  static loadingStatus(state: EventsStateModel) {
    return state.loadingStatus;
  }

  @Action(LoadAllEvents)
  loadEvents(ctx: StateContext<EventsStateModel>) {
    ctx.patchState({ loadingStatus: 'loading' });
    return this.eventsService.getAll().pipe(
      tap((allEvents) => {
        ctx.dispatch(new LoadAllEventsSuccess({ allEvents }));
      }),
      catchError((error) => {
        ctx.dispatch(new LoadEventsFailure({ error: error.message }));
        throw error;
      })
    );
  }

  @Action(LoadEventsByCategory)
  loadEventsByCategory(ctx: StateContext<EventsStateModel>, {payload: {category}}: LoadEventsByCategory) {
    ctx.patchState({ loadingStatus: 'loading' });
    return this.eventsService.getEventsByCategory(category).pipe(
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
    const filteredEvent = ctx.getState().categoryEvents.find(event => event.id === action.payload.eventId);
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

  @Action(UnselectEvent)
  onUnselectEvent(ctx: StateContext<EventsStateModel>) {
    ctx.dispatch(new LoadEventSuccess({ event: null}));
  }

  @Action(LoadEventsSuccess)
  onLoadEventsSuccess(ctx: StateContext<EventsStateModel>, {payload: {events}}: LoadEventsSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loadingStatus: 'loaded',
      categoryEvents: events
    });
  }

  @Action(LoadAllEventsSuccess)
  onLoadAllEventsSuccess(ctx: StateContext<EventsStateModel>, {payload: {allEvents}}: LoadAllEventsSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loadingStatus: 'loaded',
      allEvents
    });
  }

  @Action(LoadEventsFailure)
  onLoadEventsFailure(ctx: StateContext<EventsStateModel>, {payload: {error}}: LoadEventsFailure) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loadingStatus: 'error',
      error
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
  onLoadEventFailure(ctx: StateContext<EventsStateModel>, {payload: {error}}: LoadEventFailure) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loadingStatus: 'error',
      error,
      selectedEvent: null
    });
  }

  @Action(AddEvent)
  onAddEvent(ctx: StateContext<EventsStateModel>, action: AddEvent) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      categoryEvents: [...state.categoryEvents, action.payload.event],
      createdEvent: action.payload.event
    });
  }

  @Action(UpdateEvent)
  updateEvent(ctx: StateContext<EventsStateModel>, action: UpdateEvent) {
    return this.firestoreApiService.updateEvent(action.payload.eventId, action.payload.eventData).then(() => {
      const state = ctx.getState();
      const updatedEvents = state.categoryEvents.map(event =>
        event.id === action.payload.eventId ? { ...event, ...action.payload.eventData } : event
      );
      ctx.setState({
        ...state,
        categoryEvents: updatedEvents
      });
    });
  }

  @Action(DeleteEvent)
  deleteEvent(ctx: StateContext<EventsStateModel>, { payload: { eventId } }: DeleteEvent) {
    const selectedEvent = ctx.getState().selectedEvent;
    if (!selectedEvent) {
      throw new Error('No event selected');
    }
    const participants = selectedEvent.participants;
    return from(participants).pipe(
      mergeMap((participant) =>
        this.firestoreApiService.removeFromUserJoinedEvents(participant.userId, eventId)
      ),
      toArray(),
      switchMap(() => this.firestoreApiService.deleteEvent(eventId)),
      tap(() => ctx.dispatch(new DeleteEventSuccess({ eventId }))),
      catchError((error) => {
        ctx.dispatch(new DeleteEventFailure({ error }));
        return throwError(() => new Error(error));
      })
    );
  }

  @Action(DeleteEventSuccess)
  onDeleteEventSuccess(ctx: StateContext<EventsStateModel>, {payload: {eventId}}: DeleteEventSuccess) {
    const state = ctx.getState();
    const updatedEvents = state.categoryEvents.filter(event => event.id !== eventId);
    ctx.setState({
      ...state,
      categoryEvents: updatedEvents,
      selectedEvent: null
    });
    this.router.navigate(['home'])
  }

  @Action(DeleteEventFailure)
  onDeleteEventFailure(ctx: StateContext<EventsStateModel>, {payload: {error}}: DeleteEventFailure) {
    const state = ctx.getState();
    ctx.setState({ ...state, error });
  }

}
