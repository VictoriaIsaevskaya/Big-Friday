import {UserPreferences} from "../../modals/model/interfaces";
import {User} from "../../shared/models/interfaces/user";


export class JoinUserToEvent {
  static readonly type = '[User] Join User To Event';
  constructor(public payload: { userId: string, events: string[] }) {}
}

export class PreferencesUpload {
  static readonly type = '[User] Preferences Upload Start';
  constructor(public payload: { preferences: UserPreferences }) {}
}

export class PreferencesUploadSuccess {
  static readonly type = '[User] Preferences Upload Success';
  constructor(public payload: { preferences: UserPreferences }) {}
}

export class PreferencesUploadFailure {
  static readonly type = '[User] Preferences Upload Failure';
  constructor(public payload: { error: any }) {}
}

export class SetUserPreferences {
  static readonly type = '[User] Set Preferences';
  constructor(public payload: { preferences: User }) {}
}


export class JoinUserToEventSuccess {
  static readonly type = '[User] Join User To Event Success';
  constructor(public payload: { events: string[] }) {}

}

export class JoinUserToEventFailure {
  static readonly type = '[User] Join User To Event Failure';
  constructor(public payload: { error: any }) {}
}
