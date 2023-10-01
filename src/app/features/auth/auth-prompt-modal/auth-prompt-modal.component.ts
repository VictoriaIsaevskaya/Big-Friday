import {Component, OnDestroy} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {ModalController, ToastController} from '@ionic/angular';
import {select, Store} from "@ngrx/store";
import {combineLatest, Subject, takeUntil, tap} from "rxjs";

import {AuthService} from "../../../services/auth.service";
import * as fromAuthState from '../../../state/auth';



@Component({
  selector: 'app-auth-prompt-modal',
  templateUrl: './auth-prompt-modal.component.html',
  styleUrls: ['./auth-prompt-modal.component.scss'],
})
export class AuthPromptModalComponent implements OnDestroy {
  loginForm: FormGroup;
  showLoginForm: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, public modalCtrl: ModalController, private afAuth: AngularFireAuth,
              private toastCtrl: ToastController, private authService: AuthService, private store: Store,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  showLogin() {
    this.showLoginForm = true;
  }

  continueAsGuest() {
    this.modalCtrl.dismiss({ continueAsGuest: true });
    this.store.dispatch(fromAuthState.loginSuccess({user: { uid: '', displayName: 'guest', email: '' }}))
    this.router.navigate(['/events'])
  }

  ngOnInit() {
    combineLatest([
      this.store.pipe(select(fromAuthState.selectIsLoggedIn), takeUntil(this.destroy$)),
      this.store.pipe(select(fromAuthState.selectAuthError), takeUntil(this.destroy$))
    ]).pipe(
      tap(([isLoggedIn, error]) => {
        if (isLoggedIn) {
          this.modalCtrl.dismiss({ loggedIn: true });
        } else if (error) {
          this.showToast("Error during login. Please check your credentials and try again.");
        }
      })
    ).subscribe();
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.store.dispatch(fromAuthState.login({email, password}))
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
