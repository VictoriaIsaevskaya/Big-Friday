import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import {Store} from "@ngxs/store";

import {registerFields} from "../../shared/helpers/preference-fields";
import {RegisterUser} from '../../state/auth';
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
  fileName: string;

  constructor(private fb: FormBuilder, private modalController: ModalController, private store: Store) {
    this.preferencesForm = this.fb.group({
      username: ['', Validators.required],
      photo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      about: [''],
      preferredLanguages: [''],
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

  onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    } else {
      this.fileName = '';
    }
  }

  deleteFile() {
    this.fileName = ''; // Обнуляем имя файла
    this.preferencesForm.patchValue({ photo: null });
  }

  private register(email: string, password: string, preferences: UserPreferences): void {
    this.store.dispatch(new RegisterUser({email, password, preferences}));
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
