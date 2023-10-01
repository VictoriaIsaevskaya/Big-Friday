import { createReducer, on } from '@ngrx/store';

import {UserPreferences} from "../../modals/model/interfaces";
import {User} from "../../shared/models/interfaces/user";

import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  error: any | null;
  preferences: UserPreferences | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  preferences: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error, user: null })),
  on(AuthActions.setCurrentUser, (state, { user }) => ({ ...state, user })),
  on(AuthActions.registerSuccess, (state) => ({ ...state, error: null })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error, user: null })),
  on(AuthActions.preferencesUploadSuccess, (state, { preferences }) => ({ ...state, preferences })),
  on(AuthActions.setUserPreferences, (state, { preferences }) => ({ ...state, preferences })),
  on(AuthActions.preferencesUploadFailure, (state, { error }) => ({ ...state, error, preferences: null }))
);
