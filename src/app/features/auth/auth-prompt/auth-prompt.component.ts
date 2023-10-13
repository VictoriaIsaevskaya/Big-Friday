import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from "@angular/router";
import {IonicModule, ToastController} from '@ionic/angular';
import {Store} from '@ngxs/store';

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";
import {AuthService} from "../../../services/auth.service";
import {LoginSuccess} from "../../../state/auth";
import {LoginFormComponent} from "../login-form/login-form.component";



@Component({
  selector: 'app-auth-prompt',
  templateUrl: './auth-prompt.component.html',
  styleUrls: ['./auth-prompt.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    LoginFormComponent,
    PageHeaderComponent,
    RouterModule,
  ],
})
export class AuthPromptComponent {

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth,
              private toastCtrl: ToastController, private authService: AuthService, private store: Store,
              private router: Router) {
  }

  continueAsGuest() {
    this.store.dispatch(new LoginSuccess( { user: { uid: '', displayName: 'guest', email: '' }}));
    this.router.navigate(['/events']);
  }
}
