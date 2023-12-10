import {CommonModule} from "@angular/common";
import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";
import {ChatBoxComponent} from "../chat-box/chat-box.component";
import {ChatMessage} from "../model/interfaces/chat.interface";


@Component({
  selector: 'app-chats',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, PageHeaderComponent, FormsModule, ChatBoxComponent]
})
export class ChatComponent  implements OnInit {
  chatName: string = 'Chat Name';
  message: string = '';
  isLoading = false;
  currentUserId = '1'
  messages: ChatMessage[] = [
    {
      id: '1',
      senderId: '1',
      text: 'Hello!',
      timestamp: new Date()
    },
    {
      id: '2',
      senderId: '2',
      text: 'Hi there!',
      timestamp: new Date()
    }
  ];
  constructor() { }

  ngOnInit() {}
  sendMessage() {
    if (this.message.trim() !== '') {
      this.messages.push({
        id: '1',
        senderId: '1',
        text: this.message,
        timestamp: new Date()
      });

      this.message = '';
    }
  }
}
