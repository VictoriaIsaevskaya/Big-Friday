import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Platform, PopoverController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithCredential } from "firebase/auth";
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IUserDetails } from '../modals/model/interfaces';
import { NotificationComponent } from '../shared/components/notification-modal/notification.component';
import { FetchCurrentUser } from '../state/auth';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  isWeb = false
  firebase: any
  authApp: any
  provider = new GoogleAuthProvider()
  private destroyRef = inject(DestroyRef);

  constructor(
    private authService: AuthService,
    private store: Store,
    private platform: Platform,
    private popoverController: PopoverController) {
    this.isWeb = !(this.platform.is('android') || this.platform.is('ios'));

    this.firebase = initializeApp(environment.firebase);
    this.authApp = getAuth(this.firebase)
  }

  initialize() {
    if (this.isWeb) {
      GoogleAuth.initialize({ grantOfflineAccess: true });
    }
    // this.refreshToken()
  }

  // public async refreshToken() {
  //   console.log('refreshToken');
  //   const auth = getAuth(this.firebase);
  //   onAuthStateChanged(auth, async (currenUser: User | null) => {
  //     if (currenUser) {
  //       const idToken = await currenUser.getIdToken(true);
  //       console.log(idToken);
  //       localStorage.setItem('AccessToken', idToken);
  //     } else {
  //       await this.authService.logout();
  //     }
  //   });
  // }

  async signUpViaGoogle(): Promise<boolean> {
    try {
      const user = await GoogleAuth.signIn()
      if (!user) return false
      const credential = GoogleAuthProvider.credential(user.authentication.idToken);
      const auth = getAuth();
      const signInResult = await signInWithCredential(auth, credential);
      const signInMethods = await fetchSignInMethodsForEmail(auth, signInResult.user.email);

      if (signInMethods.length > 0) {
        await this.notificationAppear('An account with this email address already exists');
        return false;
      } else {
        this.store.dispatch(new FetchCurrentUser());
        return true;
      }
    } catch (error) {
      console.error('Error during login with Google:', error);
      return false;
    }
  }

  async verificationEmail(email: string) {
    this.authService.sendVerificationEmail(email)
      .pipe(
        tap(async () => {
          await this.notificationAppear('Verification email sent. Check your email').then(() => {
          });
        }),
        catchError(error => {
          console.error('Failed to send verification email', error);
          throw error;
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
  }

  async verifyEmail(email: string, emailLink: string): Promise<boolean> {
    return this.authService.verifyEmail(email, emailLink);
  }

  registerUser(signUpDetails: IUserDetails): Observable<any> {
    return this.authService.finalizeRegistration(signUpDetails.name, signUpDetails.password)
  }

  async notificationAppear(text: string) {
    const popover = await this.popoverController.create({
      component: NotificationComponent,
      side: 'bottom',
      alignment: 'start',
      animated: true,
      translucent: true,
      componentProps: { text }
    });
    await popover.present();
    setTimeout(() => {
      popover.dismiss();
    }, 2000);
  }
}
