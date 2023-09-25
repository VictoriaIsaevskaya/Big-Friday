import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {IonicModule, PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-user-settings-dropdown',
  templateUrl: './user-settings-dropdown.component.html',
  styleUrls: ['./user-settings-dropdown.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class UserSettingsDropdownComponent {

  constructor(private popoverController: PopoverController, private router: Router) { }

  navigateToProfile() {
    this.router.navigate(['profile'])
    this.popoverController.dismiss();
  }

  async signOut() {
    localStorage.setItem('loggingOut', 'true');
    location.reload();
    this.popoverController.dismiss();
  }
}
