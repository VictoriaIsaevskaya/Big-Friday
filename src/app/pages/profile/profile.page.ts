import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {PopoverController} from "@ionic/angular";
import {Store} from "@ngxs/store";

import {ExpandableTextComponent} from "../../shared/components/expandable-text/expandable-text.component";
import {OverflowCheckDirective} from "../../shared/directive/overflow-check.directive";
import {PreferenceField, preferenceFields} from "../../shared/helpers/preference-fields";
import {AuthState, PreferencesUpload} from "../../state/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, AfterViewInit {
  profileForm: FormGroup
  formFieldsMap: PreferenceField[] = preferenceFields;

  isEditing = false;
  @ViewChild('popover') popover;

  @ViewChildren('fieldInput', { read: OverflowCheckDirective }) fieldInputs: QueryList<OverflowCheckDirective>;

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkOverflow();
    }, 500);
  }

  checkOverflow() {
    this.fieldInputs.toArray().forEach((directive, index) => {
      const ionInputElement = directive.el.nativeElement;
      const actualInputElement = ionInputElement.querySelector('input');

      if (actualInputElement) {
        const isFieldOverflowing = actualInputElement.scrollWidth > actualInputElement.clientWidth;

        if (this.formFieldsMap[index].isEditing) {
          this.formFieldsMap[index].isOverflowing = false;
        } else {
          this.formFieldsMap[index].isOverflowing = isFieldOverflowing;
        }
      }
    });
  }



  constructor(private fb: FormBuilder, private store: Store, private popoverController: PopoverController) {}

  ngOnInit(): void {
    this.initializeProfileForm();
  }

  async showFullText(ev: any, textToDisplay: string) {
    const popover = await this.popoverController.create({
      component: ExpandableTextComponent,
      event: ev,
      translucent: true,
      componentProps: {
        text: Array.isArray(textToDisplay) ? textToDisplay.join(' ') : textToDisplay,
      },
      side: 'left',
      alignment: 'start',
    });
    return await popover.present();
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
    this.checkOverflow();
  }

  navigateToEditProfile() {

  }

  navigateToUpcomingEvents() {

  }

  navigateToPastEvents() {

  }
}
