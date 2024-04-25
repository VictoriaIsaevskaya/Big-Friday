import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {State, Action, StateContext, Selector} from '@ngxs/store';
import { tap } from 'rxjs';
import {catchError} from "rxjs/operators";

import {AuthService} from "../../services/auth.service";
import { LoginService } from '../../services/login-service';
import {UserAuthInfo} from "../../shared/models/interfaces/user";

import {
  LoginSuccess,
  LoginFailure,
  SetCurrentUser,
  RegisterSuccess,
  RegisterFailure,
  Logout,
  LogoutFailure,
  LogoutSuccess,
  RegisterUser,
  Login,
  FetchCurrentUser,
  SetUserInfo,
} from './auth.actions';



export interface AuthStateModel {
  user: UserAuthInfo | null;
  error: any | null;
}

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    error: null,
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, public loginService: LoginService, private firestore: AngularFirestore, private router: Router, private toastController: ToastController) {
  }

  @Action(RegisterUser)
  register(ctx: StateContext<AuthStateModel>, action: RegisterUser) {
    const {email, password, preferences} = action.payload;
    return this.loginService.registerUser({email, password, name: preferences.username})
      .pipe(
        tap((data) => {
          localStorage.setItem('userName', data.displayName)
          ctx.dispatch(new SetCurrentUser({user: data}))
          return this.firestore.collection('users').doc(data.uid).set(preferences)
        }),
        catchError((error) => {
          console.error("Registration error:", error);
          throw new Error('Registration failed');
        })
      )
  }

  @Action(SetUserInfo)
  setUserInfo(ctx: StateContext<AuthStateModel>, action: SetUserInfo) {

  }

  @Action(FetchCurrentUser)
  fetchCurrentUser (ctx: StateContext<AuthStateModel>, action: FetchCurrentUser) {
    console.log(ctx.getState().user.displayName, ctx.getState().user.email, ctx.getState().user.uid);
  }


  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    const {email, password} = action.payload;

    return this.authService.login(email, password).pipe(
      tap((userCredential) => {
        ctx.dispatch(new LoginSuccess({ user: userCredential.user }));
        this.router.navigateByUrl('home');
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
    this.presentToast()

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

  @Selector()
  static authData(state: AuthStateModel) {
    return state;
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
  static isLoggedIn(state: AuthStateModel) {
    return !!state.user.uid;
  }

  @Selector()
  static hasError(state: AuthStateModel) {
    return !!state.error;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Email or/and password are incorrect!',
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }
}
