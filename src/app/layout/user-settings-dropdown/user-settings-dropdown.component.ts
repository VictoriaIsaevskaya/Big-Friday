import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { IonicModule, PopoverController } from "@ionic/angular";
import { Store } from '@ngxs/store';

import {LoginFormComponent} from "../../features/auth/login-form/login-form.component";
import {AuthState, Logout} from '../../state/auth';

@Component({
  selector: 'app-user-settings-dropdown',
  templateUrl: './user-settings-dropdown.component.html',
  styleUrls: ['./user-settings-dropdown.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, LoginFormComponent]
})
export class UserSettingsDropdownComponent {
  isUserLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn)
  constructor(
    private popoverController: PopoverController,
    private router: Router,
    private store: Store
  ) { }

  navigateToProfile() {
    this.router.navigate(['dashboard']);
    this.closePopover();
  }

  async signOut() {
    this.store.dispatch(new Logout());
    this.closePopover();
  }

  closePopover() {
    this.popoverController.dismiss();
  }


}
