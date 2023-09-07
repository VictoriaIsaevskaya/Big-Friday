import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class PreferencesComponent {

  preferencesForm: FormGroup;
  formFieldsMap = [
    { controlName: 'username', placeholder: 'Username', type: 'input', icon: 'person-outline' },
    { controlName: 'about', placeholder: 'About You', type: 'textarea', icon: 'information-circle-outline' },
    { controlName: 'preferredLanguage', placeholder: 'Preferred Language', type: 'select', icon: 'language-outline', options: ['English', 'Russian', 'Polish', 'Spanish', 'French'], multiple: true },
    { controlName: 'interests', placeholder: 'Interests', type: 'select', icon: 'heart-outline', options: ['Bowling', 'Cinema', 'Theatre', 'Hiking', 'Reading'], multiple: true },
    { controlName: 'ageGroup', placeholder: 'Age Group', type: 'select', icon: 'calendar-outline', options: ['18-25', '26-35', '36-45', '46-55', '56+'] }
  ];


  constructor(private fb: FormBuilder, private modalController: ModalController, private storage: Storage) {
    this.preferencesForm = this.fb.group({
      username: ['', Validators.required],
      about: [''],
      preferredLanguage: [''],
      interests: [[]],
      ageGroup: ['']
    });
  }

  submitPreferences() {
    if (this.preferencesForm.valid) {
      this.savePreferences(this.preferencesForm.value);
    }
  }

  async savePreferences(preferences: any) {
    await this.storage.set('userPreferences', preferences);
  }

  dismissModal() {
    this.modalController.dismiss();

  }
}
