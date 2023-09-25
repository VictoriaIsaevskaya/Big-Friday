import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Store} from '@ngrx/store';
import firebase from "firebase/compat";
import {from, Observable} from 'rxjs';
import {fromPromise} from "rxjs/internal/observable/innerFrom";

import * as fromAuthState from '../state/auth'

import User = firebase.User;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private store: Store) {
    this.authState$.subscribe((user: User | null) => {
      if (user) {
        this.store.dispatch(fromAuthState.setCurrentUser({ user }));
      }
    })
  }

   login(email: string, password: string): Observable<any>{
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<any> {
    return fromPromise(this.afAuth.signOut());
  }

  register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  get authState$(): Observable<any> {
    return this.afAuth.authState;
  }
}
