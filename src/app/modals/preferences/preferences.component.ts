import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import {Store} from "@ngrx/store";

import {registerFields} from "../../shared/helpers/preference-fields";
import * as fromAuth from '../../state/auth'
import {UserPreferences} from "../model/interfaces";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class PreferencesComponent {

  preferencesForm: FormGroup;
  formFieldsMap = registerFields;


  constructor(private fb: FormBuilder, private modalController: ModalController, private store: Store) {
    this.preferencesForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      about: [''],
      preferredLanguage: [''],
      interests: [[]],
      ageGroup: ['']
    });
  }

  submitPreferences() {
    if (this.preferencesForm.valid) {
      const { email, password, ...preferences } = this.preferencesForm.value
      this.register(email, password, preferences);
      this.dismissModal();
    }
  }

  private register(email: string, password: string, preferences: UserPreferences): void {
    this.store.dispatch(fromAuth.register({email, password, preferences}))
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
