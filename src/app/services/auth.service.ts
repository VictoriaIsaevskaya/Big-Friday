import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  getAuth,
  updateProfile,
  updatePassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { from, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { User, UserAuthInfo } from '../shared/models/interfaces/user';
import { AuthState, LoginSuccess, SetCurrentUser } from '../state/auth/';
import {SetUserPreferences} from "../state/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private destroyRef = inject(DestroyRef);

  constructor(private router: Router, private afAuth: AngularFireAuth, private store: Store, private firestore: AngularFirestore) {
    this.authState$.subscribe();
  }

  private getUserPreferences(uid: string): Observable<User> {
    return this.firestore.collection('users').doc<User>(uid).valueChanges();
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  loginWithToken(token: string): Observable<any> {
    return from(this.afAuth.signInWithCustomToken(token))
  }

  logout(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  sendVerificationEmail(email: string): Observable<void> {
    // const baseUrl = environment.production
    //   ? 'https://victoriaisaevskaya.github.io/big-friday/auth/signup' // URL развернутого приложения
    //   : 'http://localhost:8100/auth/signup'; // URL для локальной разработки

    const actionCodeSettings = {
      url: 'http://localhost:8100/auth/signup',
      handleCodeInApp: true,
    };

    return from(this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings)).pipe(
      tap(() => localStorage.setItem('emailForRegistration', email)),
      catchError(error => {
        console.error('Error sending verification email', error);
        throw error;
      })
    );
  }

  async verifyEmail(email: string, emailLink: string): Promise<boolean> {
    const result = await this.afAuth.signInWithEmailLink(email, emailLink);
    try {
       if (result.user) {
         localStorage.setItem('isVerifyEmail', 'true');
         this.router.navigate(['/auth/signup'])
         return true;
      } else {
         console.error('No user linked with this email');
         return false;
      }
    } catch (error) {
      console.error('Error signing in with email link:', error);
      return false;
    }
  }

  finalizeRegistration(name: string, password: string): Observable<UserAuthInfo> {
    const auth = getAuth();
    return new Observable<UserAuthInfo>(subscriber => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          from(updatePassword(user, password)).pipe(
            switchMap(() => updateProfile(user, { displayName: name }).then(() => user)),
            tap(() => {
              subscriber.next({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                password: password
              });
              subscriber.complete();
            }),
            catchError(error => throwError(() => new Error("Failed to finalize registration"))),
            takeUntilDestroyed(this.destroyRef)
          ).subscribe();
        } else {
          subscriber.error(new Error('No authenticated user available'));
        }
      });
    });
  }

  public getCurrentUserId(): string {
    return this.store.selectSnapshot(AuthState.user)?.uid
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
