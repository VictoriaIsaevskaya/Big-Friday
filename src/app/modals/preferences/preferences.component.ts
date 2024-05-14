import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { LoginService } from '../../services/login-service';
import { IconComponent } from '../../shared/icons/icon.component';
import { AuthState, RegisterUser } from '../../state/auth';
import { IUserDetails, SignUpDetails } from '../model/interfaces';
import { SignUpStep1Component } from '../sign-up-steps/sign-up-step1/sign-up-step1.component';
import { SignUpStep2Component } from '../sign-up-steps/sign-up-step2/sign-up-step2.component';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, IconComponent, SignUpStep1Component, SignUpStep2Component],
})
export class PreferencesComponent implements OnInit, OnDestroy {
  // fileName: string;
  // login: IUserDetails = {};
  step: number = 1
  private destroyRef = inject(DestroyRef);

  constructor(
    private cdr: ChangeDetectorRef,
    private modalController: ModalController,
    private store: Store,
    public loginService: LoginService,
  ) {
  }

  ngOnInit() {
    this.step = (localStorage.getItem('isVerifyEmail')) ? 2 : 1
    this.loginService.initialize();
    if(localStorage.getItem('emailForRegistration') && !localStorage.getItem('isVerifyEmail')) {
      this.step = 2
      this.handleEmailVerification()
    }
  }

  async handleEmailVerification() {
    const emailLink = window.location.href
    const email = localStorage.getItem('emailForRegistration')
     if (email) {
        const verificationResult = await this.loginService.verifyEmail(email, emailLink);
        if (verificationResult) {
          this.step = 2;
          this.cdr.detectChanges();
        }
    }
  }

  onSignUp({email, name, password}: IUserDetails) {
     this.store.dispatch(new RegisterUser({
       email,
       password,
       preferences: {username: name}
     }))
  }

  buttonEvent(event: SignUpDetails): void {
    if (event.typeOfSignUp !== 'google') {
      this.emailSignUp(event.email)
      localStorage.setItem('typeOfSignUp', 'email')
    } else{
      this.onGoogleSignUp()
      localStorage.setItem('typeOfSignUp', 'google')
    }
  }

  emailSignUp(email: string){
    this.step = 1
    this.loginService.verificationEmail(email);
  }


  onGoogleSignUp() {
    this.loginService.signUpViaGoogle().then((isSuccess) => {
      if (isSuccess) {
        this.step = 2
        this.store.select(AuthState.user).pipe(
          tap(data => {
            localStorage.setItem('userName', data.displayName)
            localStorage.setItem('emailForRegistration', data.email)
            this.step = 2
            localStorage.setItem('isVerifyEmail', 'true');
          } ),
        takeUntilDestroyed(this.destroyRef)
        ).subscribe()
        this.cdr.detectChanges()
      }
    }).catch((error) => {
      console.error('Error during login with Google:', error);
    });
  }

  submitPreferences() {
    // if (this.preferencesForm.valid) {
    //   const { email, password, ...preferences } = this.preferencesForm.value
    //   this.register(email, password, preferences);
    //   this.dismissModal();
    // }
  }

  // onFileChange(event) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.fileName = file.name;
  //   } else {
  //     this.fileName = '';
  //   }
  // }

  // deleteFile() {
  //   this.fileName = ''; // Обнуляем имя файла
  //   this.preferencesForm.patchValue({ photo: null });
  // }

  // dismissModal() {
  //   this.modalController.dismiss();
  // }

  ngOnDestroy() {
    localStorage.removeItem('typeOfSignUp')
    localStorage.removeItem('emailForRegistration')
    localStorage.removeItem('userName')
    localStorage.removeItem('isVerifyEmail')
  }

}
