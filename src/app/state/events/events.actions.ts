import {EventDetails} from "../../features/events/model/interfaces";

export class LoadAllEvents {
  static readonly type = '[Events] Load All Events';
}

export class LoadAllEventsSuccess {
  static readonly type = '[Events] Load All Events Success';
  constructor(public payload: { allEvents: EventDetails[] }) {}
}

export class LoadEventsSuccess {
  static readonly type = '[Events] Load Events Success';
  constructor(public payload: { events: EventDetails[] }) {}
}

export class LoadEventsFailure {
  static readonly type = '[Events] Load Events Failure';
  constructor(public payload: { error: string }) {}
}

export class LoadEventsByCategory {
  static readonly type = '[Events] Load Events By Category'
  constructor(public payload: {category: string}) {
  }
}

export class AddEvent {
  static readonly type = '[Events] Add Event';
  constructor(public payload: { event: EventDetails }) {}
}

export class LoadEvent {
  static readonly type = '[Events] Load Event';
  constructor(public payload: { eventId: string }) {}
}

export class UnselectEvent {
  static readonly type = '[Events] Unselect Event'
}

export class LoadEventSuccess {
  static readonly type = '[Events] Load Event Success';
  constructor(public payload: { event: EventDetails | null }) {}
}

export class LoadEventFailure {
  static readonly type = '[Events] Load Event Failure';
  constructor(public payload: { error: string }) {}
}

export class UpdateEvent {
  static readonly type = '[Events] Update';
  constructor(public payload: { eventId: string, eventData: any }) {}
}

export class DeleteEvent {
  static readonly type = '[Events] Delete Event'
  constructor(public payload: {eventId: string}) {}
}

export class DeleteEventSuccess {
  static readonly type = '[Events] Delete Event Success'
  constructor(public payload: {eventId: string}) {}
}

export class DeleteEventFailure {
  static readonly type = '[Events] Delete Event Failure'
  constructor(public payload: {error: any}) {}

}
