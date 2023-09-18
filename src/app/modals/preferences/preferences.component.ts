import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";


import {User} from "../../shared/models/interfaces/user";
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
    { controlName: 'email', placeholder: 'Email', type: 'input', icon: 'mail-outline' },
    { controlName: 'password', placeholder: 'Password', type: 'password', icon: 'lock-closed-outline' },
    { controlName: 'confirmPassword', placeholder: 'Confirm Password', type: 'password', icon: 'lock-closed-outline' },
    { controlName: 'about', placeholder: 'About You', type: 'textarea', icon: 'information-circle-outline' },
    { controlName: 'preferredLanguage', placeholder: 'Preferred Language', type: 'select', icon: 'language-outline', options: ['English', 'Russian', 'Polish', 'Spanish', 'French'], multiple: true },
    { controlName: 'interests', placeholder: 'Interests', type: 'select', icon: 'heart-outline', options: ['Bowling', 'Cinema', 'Theatre', 'Hiking', 'Reading'], multiple: true },
    { controlName: 'ageGroup', placeholder: 'Age Group', type: 'select', icon: 'calendar-outline', options: ['18-25', '26-35', '36-45', '46-55', '56+'] }
  ];


  constructor(private fb: FormBuilder, private modalController: ModalController, private afAuth: AngularFireAuth) {
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
      this.savePreferences(this.preferencesForm.value);
    }
  }

  async savePreferences(user: User) {
    this.register(user.email, user.password)
    this.dismissModal();
  }

  private register(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('User registered successfully:', result.user);
      })
      .catch(error => {
        console.error('Error during registration:', error);
      });
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
