import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {Store} from "@ngxs/store";

import {preferenceFields} from "../../shared/helpers/preference-fields";
import {AuthState, PreferencesUpload} from "../../state/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup
  formFieldsMap = preferenceFields;

  isEditing = false;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeProfileForm();
  }

  initializeProfileForm(): void {
    const { username, about, preferredLanguages, interests, ageGroup} = this.store.selectSnapshot(AuthState.preferences);
    this.profileForm = this.fb.group({
      username: [username, Validators.required],
      about,
      preferredLanguages: [preferredLanguages],
      interests: [interests],
      ageGroup
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (this.profileForm?.valid) {
      this.store.dispatch(new PreferencesUpload({preferences: this.profileForm.value}))
      this.toggleEdit();
    }
  }

  toggleFieldEdit(field: any) {
    field.isEditing = !field.isEditing;
  }


  submitProfile() {}

  // ... other methods ...
}
