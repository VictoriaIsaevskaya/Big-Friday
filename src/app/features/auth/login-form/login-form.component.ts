import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {Store} from '@ngxs/store';

import {Login} from "../../../state/auth";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class LoginFormComponent {
  loginForm: FormGroup<{
    email: FormControl<string>,
    password: FormControl<string>,
  }>;

  constructor(private store: Store, private fb: FormBuilder, private toastController: ToastController) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.store.dispatch(new Login({email, password}))
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

}
