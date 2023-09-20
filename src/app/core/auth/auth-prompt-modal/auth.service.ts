import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Store} from '@ngrx/store';
import {from, Observable} from 'rxjs';

import * as fromAuthState from '../../../state/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private store: Store) {
    this.initializeAuthStateListener()
  }

  initializeAuthStateListener(): void {
    this.afAuth.onAuthStateChanged(user =>
      this.store.dispatch(user ? fromAuthState.setCurrentUser({ user }) : fromAuthState.logout()));
  }

   login(email: string, password: string): Observable<any>{
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Promise<any> {
    return this.afAuth.signOut();
  }

  register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  get currentUser(): Observable<any> {
    return this.afAuth.authState;
  }
}
