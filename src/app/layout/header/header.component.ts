import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IonicModule, PopoverController} from "@ionic/angular";
import {Store} from "@ngxs/store";

import {NotificationService} from "../../services/notification.service";
import {ChatState, FetchUnreadMessagesCount, UpdateUnreadMessagesCount} from "../../state/chat";
import {UserSettingsDropdownComponent} from "../user-settings-dropdown/user-settings-dropdown.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent   {
  unreadMessagesCount = this.store.select(ChatState.unreadMessagesCount)
  constructor(private popoverController: PopoverController, public notificationService: NotificationService, private store: Store) {
    this.store.dispatch(new FetchUnreadMessagesCount())
  }

  async openUserOptions(ev: any) {
    const popover = await this.popoverController.create({
      component: UserSettingsDropdownComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
