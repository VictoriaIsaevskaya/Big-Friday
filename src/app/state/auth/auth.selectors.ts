import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsLoggedIn = createSelector(
  selectUser,
  user => !!user
);

export const selectAuthError = createSelector(
  selectError,
  error => !!error
);
