import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {EMPTY, from, switchMap, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {ChatService} from "../../features/chats/chat.service";
import {UserPreferences} from "../../modals/model/interfaces";
import {FirestoreApiService} from "../../services/firestore-api.service";
import {UserActivities} from "../../shared/models/interfaces/user";
import {AuthStateModel, RegisterFailure} from "../auth";

import {
  JoinUserToEvent,
  JoinUserToEventFailure,
  JoinUserToEventSuccess, LoadUserChats, LoadUserChatsSuccess, PreferencesUpload, PreferencesUploadFailure,
  PreferencesUploadSuccess, SetUserPreferences
} from './user.actions';

export interface UserStateModel {
  userPreferences: UserPreferences | null;
  userActivities: UserActivities | null;
  error: any | null;
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
  chats: [],
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
  constructor(private firestore: AngularFirestore, private firestoreApiService: FirestoreApiService, private router: Router,
    private chatService: ChatService) {
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
    const { avatar, preferredLanguages, username, about, ageGroup, interests, joinedEvents, pastEvents, notifications, chats} = action.payload.preferences
    const userPreferences = {avatar, preferredLanguages, username, about, ageGroup, interests}
    const userActivities = {joinedEvents, pastEvents, notifications, chats}
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

  @Action(LoadUserChats)
  loadUserChats(ctx: StateContext<UserStateModel>, action: LoadUserChats) {
    return this.chatService.loadAllChats(action.payload.chatIds).pipe(
      tap((chats) => {
        ctx.dispatch(new LoadUserChatsSuccess({chats}))
      }),
      catchError(err => {
        console.log(err);
        return EMPTY
      })
    )
  }

  @Action(LoadUserChatsSuccess)
  loadUserChatsSuccess(ctx: StateContext<UserStateModel>, action: LoadUserChatsSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      userActivities: {
        ...state.userActivities,
        chats: action.payload.chats
      }
    })
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
