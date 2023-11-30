import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {from, switchMap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {UserPreferences} from "../../modals/model/interfaces";
import { FirestoreApiService } from "../../services/firestore-api.service";
import {AuthStateModel, RegisterFailure} from "../auth";

import {
  JoinUserToEvent,
  JoinUserToEventFailure,
  JoinUserToEventSuccess, PreferencesUpload, PreferencesUploadFailure,
  PreferencesUploadSuccess, SetUserPreferences
} from './user.actions';

export interface UserStateModel {
  userPreferences: UserPreferences | null;
  userActivities: UserActivities | null;
  error: any | null;
}

export interface UserActivities {
  joinedEvents: string[];
  pastEvents: string[];
}

const userPreferences = {
    username: '',
    avatar: '',
    about: '',
    preferredLanguages: [],
    interests: [],
    ageGroup: '',
}

const userActivities = {
  joinedEvents: [],
  pastEvents: [],
  notifications: [],
}

@Injectable()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    userActivities: userActivities,
    userPreferences: userPreferences,
    error: null,
  }
})
@Injectable()
export class UserState {
  constructor(private firestore: AngularFirestore, private firestoreApiService: FirestoreApiService, private router: Router) {
  }

  @Action(JoinUserToEvent)
  joinUserToEvent(ctx: StateContext<UserStateModel>, action: JoinUserToEvent) {
    const { userId, events } = action.payload;
    return this.firestoreApiService.joinUserToEvent(userId, events).then(() => {
      ctx.dispatch(new JoinUserToEventSuccess({events}));
    }).catch(error => {
      ctx.dispatch(new JoinUserToEventFailure({ error }));
    });
  }

  @Action(JoinUserToEventSuccess)
  onJoinUserToEventSuccess(ctx: StateContext<UserStateModel>, action: JoinUserToEventSuccess) {
    console.log('You have joined successfully!')
    const state = ctx.getState();
    ctx.setState({
      ...state,
      userActivities: {
        ...state.userActivities,
        joinedEvents: action.payload.events
      }
    });
  }

  @Action(JoinUserToEventFailure)
  onJoinUserToEventFailure(ctx: StateContext<UserStateModel>, action: JoinUserToEventFailure) {
    console.log('You have not joined, error occurred!')
  }

  @Action(PreferencesUpload)
  preferencesUpload(ctx: StateContext<AuthStateModel>, action: PreferencesUpload) {
    const { preferences} = action.payload;
    const uid = ctx.getState().user.uid
    return from(this.firestore.collection('users').doc(uid).set(preferences)).pipe(
      switchMap(() => {
        return ctx.dispatch(new PreferencesUploadSuccess({preferences}));
      }),
      catchError((error) => {
        console.error('Error during preferences upload:', error);
        ctx.dispatch(new RegisterFailure({ error }));
        return throwError(error);
      })
    );
  }

  @Action(PreferencesUploadSuccess)
  preferencesUploadSuccess(ctx: StateContext<UserStateModel>, action: PreferencesUploadSuccess) {
    this.router.navigateByUrl('home');

    const state = ctx.getState();
    const {preferences: userPreferences} = action.payload
    ctx.setState({
      ...state,
      userPreferences
    });
  }

  @Action(SetUserPreferences)
  setUserPreferences(ctx: StateContext<UserStateModel>, action: SetUserPreferences) {
    const state = ctx.getState();
    const { avatar, preferredLanguages, username, about, ageGroup, interests, joinedEvents, pastEvents, notifications} = action.payload.preferences
    const userPreferences = {avatar, preferredLanguages, username, about, ageGroup, interests}
    const userActivities = {joinedEvents, pastEvents, notifications}
    ctx.setState({
      ...state,
      userPreferences,
      userActivities
    });
  }

  @Action(PreferencesUploadFailure)
  preferencesUploadFailure(ctx: StateContext<UserStateModel>, action: PreferencesUploadFailure) {
    const state = ctx.getState();
    const {error} = action.payload

    ctx.setState({
      ...state,
      error: error,
    });
  }

  @Selector()
  static error(state: UserStateModel) {
    return state.error;
  }

  @Selector()
  static userPreferences(state: UserStateModel) {
    return state.userPreferences;
  }

  @Selector()
  static userActivities(state: UserStateModel) {
    return state.userActivities;
  }
}
