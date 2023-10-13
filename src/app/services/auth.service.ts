import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from '@ngxs/store';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { UserPreferences } from "../modals/model/interfaces";
import {
  LoginSuccess, SetCurrentUser,
  SetUserPreferences
} from '../state/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private store: Store, private firestore: AngularFirestore) {
    this.authState$.subscribe();
  }

  private getUserPreferences(uid: string): Observable<UserPreferences> {
    return this.firestore.collection('users').doc<UserPreferences>(uid).valueChanges();
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  register(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  get authState$(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.store.dispatch(new LoginSuccess({user}));

          return this.getUserPreferences(user.uid).pipe(
            tap(preferences => {
              if (preferences) {
                this.store.dispatch(new SetUserPreferences({ preferences }));
              }
            }),
            catchError(err => {
              console.error('Error fetching user preferences:', err);
              return this.store.dispatch(new SetCurrentUser({ user: null }));
            })
          );
        } else {
          return this.store.dispatch(new SetCurrentUser({ user: null }));
        }
      })
    );
  }
}
