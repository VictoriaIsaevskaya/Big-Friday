import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IconComponent } from '../../../shared/icons/icon.component';
import { SignUpDetails } from '../../model/interfaces';

@Component({
  selector: 'app-sign-up-step1',
  templateUrl: './sign-up-step1.component.html',
  styleUrls: ['../sign-up-steps.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, IconComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SignUpStep1Component {
  email = ''
  @Output() signUp:EventEmitter<SignUpDetails> = new EventEmitter()

  signUpViaGoogle() {
    this.signUp.emit({typeOfSignUp: 'google'})
  }

  continueWithEmail() {
    this.signUp.emit({typeOfSignUp: 'email', email: this.email})
  }
}
