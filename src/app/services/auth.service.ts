// import {Injectable} from '@angular/core';
// import {AngularFireAuth} from "@angular/fire/compat/auth";
// import {AngularFirestore} from "@angular/fire/compat/firestore";
// import {Store} from '@ngrx/store';
// // import firebase from "firebase/compat";
// import {EMPTY, filter, from, Observable, switchMap, tap} from 'rxjs';
// import {fromPromise} from "rxjs/internal/observable/innerFrom";
// import {catchError} from "rxjs/operators";
//
// import {UserPreferences} from "../modals/model/interfaces";
// import * as fromAuthState from '../state/auth'
//
// // import User = firebase.User;
//
//
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private afAuth: AngularFireAuth, private store: Store, private firestore: AngularFirestore) {
//
//     // this.authState$.pipe(
//     //   filter(user => !!user),  // Этот фильтр гарантирует, что у вас есть пользователь
//     //   switchMap(user => {
//     //     // Диспатчим событие с пользователем
//     //     this.store.dispatch(fromAuthState.setCurrentUser({ user }));
//     //
//     //     // Запрашиваем предпочтения пользователя
//     //     return this.getUserPreferences(user.uid);
//     //   })
//     // ).subscribe(preferences => {
//     //   // Диспатчим событие с предпочтениями пользователя, когда они доступны
//     //   this.store.dispatch(fromAuthState.setUserPreferences({ preferences }));
//     // });
//   }
//
//   private getUserPreferences(uid: string): Observable<UserPreferences> {
//     return this.firestore.collection('users').doc<UserPreferences>(uid).valueChanges();
//   }
//
//
//   login(email: string, password: string): Observable<any>{
//     return from(this.afAuth.signInWithEmailAndPassword(email, password));
//   }
//
//   logout(): Observable<any> {
//     return fromPromise(this.afAuth.signOut());
//   }
//
//   register(email: string, password: string): Observable<any> {
//     return from(this.afAuth.createUserWithEmailAndPassword(email, password));
//   }
//
//   // get authState$(): Observable<any> {
//   //   return this.afAuth.authState;
//   // }
//
//   get authState$(): Observable<any> {
//     return this.afAuth.authState.pipe(
//       switchMap(user => {
//         if (user) {
//           return this.getUserPreferences(user.uid).pipe(
//             tap(preferences => {
//               if (preferences) {
//                 this.store.dispatch(fromAuthState.setUserPreferences({ preferences }));
//               }
//             }),
//             catchError(err => {
//               console.error('Error fetching user preferences:', err);
//               return EMPTY;
//             })
//           );
//         } else {
//           // Если пользователь не аутентифицирован, возвращаем EMPTY
//           return EMPTY;
//         }
//       })
//     );
//   }
//
// }
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from '@ngrx/store';
import { EMPTY, from, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { UserPreferences } from "../modals/model/interfaces";
import * as fromAuthState from '../state/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private store: Store, private firestore: AngularFirestore) {
    // Эта подписка прослушивает изменения в authState$ и выполняет действия соответственно
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
          // Диспатчим событие с текущим пользователем
          this.store.dispatch(fromAuthState.setCurrentUser({ user }));

          return this.getUserPreferences(user.uid).pipe(
            tap(preferences => {
              if (preferences) {
                this.store.dispatch(fromAuthState.setUserPreferences({ preferences }));
              }
            }),
            catchError(err => {
              console.error('Error fetching user preferences:', err);
              return EMPTY;
            })
          );
        } else {
          // Если пользователь не аутентифицирован, возвращаем EMPTY
          return EMPTY;
        }
      })
    );
  }
}
