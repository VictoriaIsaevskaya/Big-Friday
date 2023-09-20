import {createAction, props} from '@ngrx/store';

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

