import { Injectable} from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {of, switchMap} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {AuthService} from "../../services/auth.service";

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action => this.performLogin(action.email, action.password)),
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
    private authService: AuthService
  ) {}
}
