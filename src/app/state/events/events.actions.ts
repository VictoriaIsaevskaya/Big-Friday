import {EventDetails, EventSummary} from "../../pages/events/model/interfaces";

export class LoadEvents {
  static readonly type = '[Events] Load Events';
}

export class LoadEventsSuccess {
  static readonly type = '[Events] Load Events Success';
  constructor(public payload: { events: EventSummary[] }) {}
}

export class LoadEventsFailure {
  static readonly type = '[Events] Load Events Failure';
  constructor(public payload: { error: string }) {}
}

export class AddEvent {
  static readonly type = '[Events] Add Event';
  constructor(public payload: { event: EventDetails }) {}
}

export class LoadEvent {
  static readonly type = '[Events] Load Event';
  constructor(public payload: { eventId: string }) {}
}

export class LoadEventSuccess {
  static readonly type = '[Events] Load Event Success';
  constructor(public payload: { event: EventDetails | null }) {}
}

export class LoadEventFailure {
  static readonly type = '[Events] Load Event Failure';
  constructor(public payload: { error: string }) {}
}
