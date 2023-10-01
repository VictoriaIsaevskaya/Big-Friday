import {createAction, props} from '@ngrx/store';

import {UserPreferences} from "../../modals/model/interfaces";
import {User} from "../../shared/models/interfaces/user";

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User | null }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const setCurrentUser = createAction(
  '[Auth] Set Current User',
  props<{ user: User | null }>()
);

export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: any }>());
export const register = createAction('[Auth] Register', props<{ email: string, password: string, preferences?: UserPreferences }>())

export const registerSuccess = createAction(
  '[Auth] Register Success'
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);
export const preferencesUpload = createAction('[Auth] Preferences Upload Start', props<{ user: any, preferences: UserPreferences }>());
export const preferencesUploadSuccess = createAction('[Auth] Preferences Upload Success', props<{preferences: UserPreferences}>());
export const setUserPreferences = createAction('[Auth] Set Preferences', props<{preferences: UserPreferences}>());
export const preferencesUploadFailure = createAction(
  '[Auth] Preferences Upload Failure',
  props<{ error: any }>()
);


