import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {tap} from "rxjs";
import {catchError} from "rxjs/operators";

import { UserPreferences } from "../../modals/model/interfaces";
import {AuthService} from "../../services/auth.service";
import { User } from "../../shared/models/interfaces/user";

import {
  LoginSuccess,
  LoginFailure,
  SetCurrentUser,
  RegisterSuccess,
  RegisterFailure,
  PreferencesUploadSuccess,
  SetUserPreferences,
  PreferencesUploadFailure, Logout, LogoutFailure, LogoutSuccess, RegisterUser, Login
} from './auth.actions';

export interface AuthStateModel {
  user: User | null;
  error: any | null;
  preferences: UserPreferences | null;
}

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    error: null,
    preferences: null
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private firestore: AngularFirestore) {
  }

  @Action(RegisterUser)
  register(ctx: StateContext<AuthStateModel>, action: RegisterUser) {
    const {email, password, preferences} = action.payload;

    return this.authService.register(email, password).pipe(
      tap((aUser) => {
        this.firestore.collection('users').doc(aUser.user.uid).set(preferences);
        ctx.dispatch(new PreferencesUploadSuccess({preferences}));
      }),
      catchError((error) => {
        console.error('Error during registration:', error);
        ctx.dispatch(new RegisterFailure({ error }));
        throw error;
      })
    );
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const {email, password} = action.payload;

    return this.authService.login(email, password).pipe(
      tap((userCredential) => {
        ctx.dispatch(new LoginSuccess({ user: userCredential.user }));
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        ctx.dispatch(new LoginFailure({ error }));
        throw error;
      })
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    const state = ctx.getState();
    const {user} = action.payload

    ctx.setState({
      ...state,
      user,
      error: null
    });
  }

  @Action(LoginFailure)
  loginFailure(ctx: StateContext<AuthStateModel>, action: LoginFailure) {
    const state = ctx.getState();
    const {error} = action.payload

    ctx.setState({
      ...state,
      user: null,
      error
    });
  }

  @Action(SetCurrentUser)
  setCurrentUser(ctx: StateContext<AuthStateModel>, action: SetCurrentUser) {
    const state = ctx.getState();
    const {user} = action.payload

    ctx.setState({
      ...state,
      user
    });
  }

  @Action(RegisterSuccess)
  registerSuccess(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      error: null
    });
  }

  @Action(RegisterFailure)
  registerFailure(ctx: StateContext<AuthStateModel>, action: RegisterFailure) {
    const state = ctx.getState();
    const {error} = action.payload

    ctx.setState({
      ...state,
      user: null,
      error
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.dispatch(new LogoutSuccess());
      }),
      catchError((error) => {
        ctx.dispatch(new LogoutFailure({ error }));
        throw error;
      })
    );
  }

  @Action(LogoutSuccess)
  onLogoutSuccess(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: null,
      error: null
    });
  }

  @Action(LogoutFailure)
  onLogoutFailure(ctx: StateContext<AuthStateModel>, action: LogoutFailure) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      error: action.payload.error
    });
  }


  @Action(PreferencesUploadSuccess)
  preferencesUploadSuccess(ctx: StateContext<AuthStateModel>, action: PreferencesUploadSuccess) {
    const state = ctx.getState();
    const {preferences} = action.payload
    ctx.setState({
      ...state,
      preferences
    });
  }

  @Action(SetUserPreferences)
  setUserPreferences(ctx: StateContext<AuthStateModel>, action: SetUserPreferences) {
    const state = ctx.getState();
    const {preferences} = action.payload
    ctx.setState({
      ...state,
      preferences
    });
  }

  @Action(PreferencesUploadFailure)
  preferencesUploadFailure(ctx: StateContext<AuthStateModel>, action: PreferencesUploadFailure) {
    const state = ctx.getState();
    const {error} = action.payload

    ctx.setState({
      ...state,
      error: error,
      preferences: null
    });
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static error(state: AuthStateModel) {
    return state.error;
  }

  @Selector()
  static preferences(state: AuthStateModel) {
    return state.preferences;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return !!state.user;
  }

  @Selector()
  static hasError(state: AuthStateModel) {
    return !!state.error;
  }
}
