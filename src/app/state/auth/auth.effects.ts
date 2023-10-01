import { Injectable} from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from, of, switchMap } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {AuthService} from "../../services/auth.service";

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({email, password, preferences}) => {
        return this.authService.register(email, password).pipe(
          mergeMap((aUser) => {
            return from(this.firestore.collection('users').doc(aUser.user.uid).set(preferences)).pipe(
              map(() => AuthActions.preferencesUploadSuccess({preferences})),
              catchError((err) => {
                console.error('Error saving preferences:', err);
                return of(AuthActions.preferencesUploadFailure({ error: err }));
              }),
            )}
          ),
          catchError(error => {
            console.error('Error during registration:', error);
            return of(AuthActions.registerFailure({ error }));
          }),
        )}
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({email, password}) => this.performLogin(email, password)),
      catchError(error => of(AuthActions.loginFailure({ error })))
    )
  );

  performLogin(email: string, password: string) {
    return this.authService.login(email, password).pipe(
      map(userCredential => AuthActions.loginSuccess({ user: userCredential.user })),
      catchError(error => of(AuthActions.loginFailure({ error })))
    );
  }

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    switchMap(() => this.authService.logout().pipe(
      map(() => AuthActions.logoutSuccess()),
      catchError(error => of(AuthActions.logoutFailure({ error })))
    ))
  ))


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}
}
