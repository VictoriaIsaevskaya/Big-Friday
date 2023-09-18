import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-auth-prompt-modal',
  templateUrl: './auth-prompt-modal.component.html',
  styleUrls: ['./auth-prompt-modal.component.scss'],
})
export class AuthPromptModalComponent {
  loginForm: FormGroup;
  showLoginForm: boolean = false;

  constructor(private fb: FormBuilder, public modalCtrl: ModalController, private afAuth: AngularFireAuth, private toastCtrl: ToastController) {
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
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log('User logged in successfully:', result.user);
          this.modalCtrl.dismiss({ loggedIn: true });
        })
        .catch(error => {
          console.error('Error during login:', error);
          this.showToast("Error during login. Please check your credentials and try again.");
        });
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,  // сообщение будет показано в течение 2 секунд
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

}
