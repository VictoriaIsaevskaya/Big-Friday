import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {ModalController, ToastController} from '@ionic/angular';
import {Store} from '@ngxs/store';
import {combineLatest, Subject, takeUntil, tap} from "rxjs";

import {AuthService} from "../../../services/auth.service";
import {AuthState, LoginSuccess} from "../../../state/auth";



@Component({
  selector: 'app-auth-prompt-modal',
  templateUrl: './auth-prompt-modal.component.html',
  styleUrls: ['./auth-prompt-modal.component.scss'],
})
export class AuthPromptModalComponent implements OnInit, OnDestroy {
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
    this.store.dispatch(new LoginSuccess( { user: { uid: '', displayName: 'guest', email: '' }}));
    this.router.navigate(['/events']);
  }

  ngOnInit() {
    combineLatest([
      this.store.select(AuthState.isLoggedIn),
      this.store.select(AuthState.hasError)
    ]).pipe(
      takeUntil(this.destroy$),
      tap(([isLoggedIn, error]) => {
        if (isLoggedIn) {
          this.modalCtrl.dismiss({ loggedIn: true });
        } else if (error) {
          this.showToast("Error during login. Please check your credentials and try again.");
        }
      })
    ).subscribe();
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
