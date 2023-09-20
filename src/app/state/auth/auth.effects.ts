import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/compat/auth";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {AuthService} from "../../core/auth/auth-prompt-modal/auth.service";

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

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}
}
