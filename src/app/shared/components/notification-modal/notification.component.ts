import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { IconComponent } from '../../icons/icon.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports:[CommonModule, IonicModule, IconComponent]
})

export class NotificationComponent {
  @Input() text = ''
}
