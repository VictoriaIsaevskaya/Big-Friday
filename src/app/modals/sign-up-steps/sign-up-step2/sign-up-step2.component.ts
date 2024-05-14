import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IconComponent } from '../../../shared/icons/icon.component';
import { IUserDetails } from '../../model/interfaces';



@Component({
  selector: 'app-sign-up-step2',
  templateUrl: './sign-up-step2.component.html',
  styleUrls: ['../sign-up-steps.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, IconComponent, FormsModule]
})


export class SignUpStep2Component implements OnInit {
  @Output() signUp:EventEmitter<IUserDetails> = new EventEmitter()
  userName = ''
  userEmail = ''
  typeOfSignUp = ''
  showPassword = true
  registrationForm: FormGroup
  constructor(private fb: FormBuilder ) {
  }

  ngOnInit() {
    this.typeOfSignUp = localStorage.getItem('typeOfSignUp')
    this.userEmail = localStorage.getItem('emailForRegistration')
    this.userName = localStorage.getItem('userName')
    this.registrationForm = this.fb.group({
      name: [this.userName, Validators.required],
      email: [this.userEmail, [Validators.required, Validators.email]],
      password: (this.typeOfSignUp === 'email') ? ['', [Validators.required]] : ['']
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  buttonEvent() {
    if (this.registrationForm.valid) {
      const signUpDetails: IUserDetails = {
        name: this.registrationForm.get('name').value,
        email: this.registrationForm.get('email').value,
        password: this.registrationForm.get('password').value
      };
      this.signUp.emit(signUpDetails);
      this.registrationForm.reset()
      } else {
      console.error('Form is not valid:', this.registrationForm.errors);
    }
  }
}
