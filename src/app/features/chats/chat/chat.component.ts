import {CommonModule} from "@angular/common";
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {IonicModule, IonContent } from "@ionic/angular";
import {Store} from "@ngxs/store";

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";
import {AuthState} from "../../../state/auth";
import {ChatState, LoadCurrentChat, SendMessage} from "../../../state/chat";
import {UserState} from "../../../state/user";
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
  chatName: string = '';
  message: string = '';
  isLoading = false;
  currentUserId = this.store.selectSnapshot(AuthState.user)?.uid;
  messages: ChatMessage[] = [];
  processedMessages: (ChatMessage | string)[] = [];
  senderName = this.store.selectSnapshot(UserState.userPreferences).username

  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('chatId');
    this.store.dispatch(new LoadCurrentChat({ chatId }));
    this.subscribeToMessages();
    this.subscribeToChatDetails();
  }

  subscribeToMessages() {
    this.store.select(ChatState.messages).subscribe((messages) => {
      this.messages = messages?.map(message => ({
          ...message,
          timestamp: message.timestamp.seconds ? new Date(message.timestamp.seconds * 1000) : new Date()
        })
      );
      this.processedMessages = this.processMessages(this.messages);
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  subscribeToChatDetails() {
    this.store.select(ChatState.currentChatDetails).subscribe((chatDetails) => {
      if (chatDetails) {
        this.chatName = chatDetails.details?.name;
        this.messages = chatDetails.messages || [];
      }
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      const newMessage: ChatMessage = {
        senderId: this.currentUserId,
        senderName: this.senderName,
        text: this.message,
        timestamp: new Date()
      };

      this.store.dispatch(new SendMessage({
        chatId: this.route.snapshot.paramMap.get('chatId'),
        message: newMessage
      }));
      this.message = '';
    }
  }

  private scrollToBottom(): void {
    if (this.content) {
      this.content.scrollToBottom(0);
    }
  }

  private processMessages(messages: ChatMessage[]): (ChatMessage | string)[] {
    const processedMessages: (ChatMessage | string)[] = [];
    let lastDate: string | null = null;

    messages?.forEach(message => {
      const messageDate = message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp.seconds * 1000);
      const formattedDate = messageDate.toLocaleDateString("en-GB").replace(/\//g, "-"); // Формат дд-мм-гггг

      if (lastDate === null || formattedDate !== lastDate) {
        processedMessages.push(formattedDate);
        lastDate = formattedDate;
      }
      processedMessages.push(message);
    });

    return processedMessages;
  }

  isString(item: any): item is string {
    return typeof item === 'string';
  }

}
