import {CommonModule} from "@angular/common";
import { Component } from '@angular/core';
import {IonicModule, PopoverController} from "@ionic/angular";

import {UserSettingsDropdownComponent} from "../user-settings-dropdown/user-settings-dropdown.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,]
})
export class HeaderComponent   {
  constructor(private popoverController: PopoverController) { }

  async openUserOptions(ev: any) {
    const popover = await this.popoverController.create({
      component: UserSettingsDropdownComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
