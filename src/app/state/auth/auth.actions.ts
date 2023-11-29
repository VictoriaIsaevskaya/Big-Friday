import {UserPreferences} from "../../modals/model/interfaces";
import {UserAuthInfo} from "../../shared/models/interfaces/user";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(public payload: { user: UserAuthInfo | null }) {}
}

export class LoginFailure {
  static readonly type = '[Auth] Login Failure';
  constructor(public payload: { error: any }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class LogoutSuccess {
  static readonly type = '[Auth] Logout Success';
}

export class LogoutFailure {
  static readonly type = '[Auth] Logout Failure';
  constructor(public payload: { error: any }) {}
}


export class SetCurrentUser {
  static readonly type = '[Auth] Set Current User';
  constructor(public payload: { user: UserAuthInfo | null }) {}
}

export class RegisterUser {
  static readonly type = '[Auth] Register';
  constructor(public payload: { email: string; password: string; preferences: UserPreferences }) {}
}

export class RegisterSuccess {
  static readonly type = '[Auth] Register Success';
}

export class RegisterFailure {
  static readonly type = '[Auth] Register Failure';
  constructor(public payload: { error: any }) {}
}
