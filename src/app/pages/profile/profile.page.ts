import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {preferenceFields} from "../../shared/helpers/preference-fields";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  formFieldsMap = preferenceFields;

  isEditing = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeProfileForm();
  }

  initializeProfileForm(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      about: [''],
      preferredLanguage: [''],
      interests: [[]],
      ageGroup: ['']
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (this.profileForm?.valid) {
      // Save profile logic here ...
      this.toggleEdit();
    }
  }

  toggleFieldEdit(field: any) {
    field.isEditing = !field.isEditing;
  }


  submitProfile() {}

  // ... other methods ...
}
