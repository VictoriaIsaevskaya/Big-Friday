import {CommonModule} from "@angular/common";
import {Component, Input} from '@angular/core';
import {IonicModule} from "@ionic/angular";

import {ChatMessage} from "../model/interfaces/chat.interface";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ChatBoxComponent {
  @Input() message: ChatMessage | string;
  @Input() currentUserId: string;

  isChatMessage(item: any): item is ChatMessage {
    return item.hasOwnProperty('text');
  }

}
