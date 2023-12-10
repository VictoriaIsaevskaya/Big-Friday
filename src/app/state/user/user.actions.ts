import {ChatRoom} from "../../features/chats/model/interfaces/chat.interface";
import {UserPreferences} from "../../modals/model/interfaces";
import {JoinedEvent, User} from "../../shared/models/interfaces/user";


export class JoinUserToEvent {
  static readonly type = '[User] Join User To Event';
  constructor(public payload: { userId: string, events: JoinedEvent[] }) {}
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
  constructor(public payload: { events: JoinedEvent[] }) {}

}

export class JoinUserToEventFailure {
  static readonly type = '[User] Join User To Event Failure';
  constructor(public payload: { error: any }) {}
}

export class LoadUserChats {
  static readonly type = '[User] Load User Chats'
  constructor(public payload: { chatIds: string[]}) {}
}

export class LoadUserChatsSuccess {
  static readonly type = '[User] Load User Chats Success'
  constructor(public payload: { chats: ChatRoom[]}) {
  }
}
