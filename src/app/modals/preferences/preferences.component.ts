import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import {EMPTY, from, switchMap, tap} from "rxjs";
import {catchError} from "rxjs/operators";

import {registerFields} from "../../shared/helpers/preference-fields";

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


  constructor(private fb: FormBuilder, private modalController: ModalController, private afAuth: AngularFireAuth,
              private firestore: AngularFirestore) {
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
      const { email, password } = this.preferencesForm.value
      this.savePreferences(email, password);
    }
  }

  async savePreferences(email: string, password: string) {
    this.register(email, password)
    this.dismissModal();
  }

  private register(email: string, password: string): void {
    from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(result=> console.log('User registered successfully:', result.user)),
      catchError(error => {
        console.error('Error during registration:', error);
        return EMPTY;
      }),
      switchMap((aUser) => {
        if (aUser.user) {
          return from(this.firestore.collection('users').doc(aUser.user.uid).set(this.preferencesForm.value)).pipe(
            tap(() => 'Your preferencess were saved.'),
            catchError((err) => {
              console.log(err);
              return EMPTY
            })
          );
        }
        return EMPTY
      }),
    ).subscribe()
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
