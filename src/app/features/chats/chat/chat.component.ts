import {CommonModule} from "@angular/common";
import {Component, DestroyRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {IonContent, IonicModule} from "@ionic/angular";
import {Store} from "@ngxs/store";
import {
  distinctUntilChanged,
  filter, Observable,
  Subscription,
  take,
  withLatestFrom
} from "rxjs";

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";
import {EmptyStateComponent} from "../../../shared/components/empty-state/empty-state.component";
import {AuthState} from "../../../state/auth";
import {ChatState, LoadCurrentChat, ResetChatUnreadMessages, SendMessage} from "../../../state/chat";
import {UserState} from "../../../state/user";
import {ChatBoxComponent} from "../chat-box/chat-box.component";
import {ChatMessage, ChatRoom} from "../model/interfaces/chat.interface";


@Component({
  selector: 'app-chats',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, PageHeaderComponent, FormsModule, ChatBoxComponent, EmptyStateComponent],
})
export class ChatComponent  implements OnInit, OnDestroy {
  chatDetails$: Observable<ChatRoom>;
  message: string = '';
  isLoading = false;
  currentUserId = this.store.selectSnapshot(AuthState.user)?.uid;
  messages: ChatMessage[] = [];
  processedMessages: (ChatMessage | string)[] = [];
  senderName = this.store.selectSnapshot(UserState.userPreferences).username
  subscription: Subscription;

  @ViewChild(IonContent, { static: false }) content: IonContent;
  private destroyRef = inject(DestroyRef);
  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('chatId');
    this.store.dispatch(new LoadCurrentChat({ chatId })).pipe(distinctUntilChanged((prev, curr) => prev === curr),take(1));
    this.chatDetails$ = this.store.select(ChatState.currentChatDetails)
    this.subscribeToMessages();
  }

  subscribeToMessages() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.store.select(ChatState.messages)
      .pipe(
        distinctUntilChanged((prevMessages, currMessages) => prevMessages?.length === currMessages?.length),
        withLatestFrom(this.chatDetails$),
        filter(([messages, currentChatDetails]) => !!messages?.length && currentChatDetails.id === this.route.snapshot.paramMap.get('chatId')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([messages, currentChatDetails]) => {
        this.messages = messages?.map(message => ({
            ...message,
            timestamp: message.timestamp.seconds ? new Date(message.timestamp.seconds * 1000) : new Date()
          })
        );
        this.processedMessages = this.processMessages(this.messages);
        setTimeout(() => this.scrollToBottom(), 100);
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

  handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
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

  trackByIdx(index: number, item: ChatMessage | string): number {
    return index;
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetChatUnreadMessages({chatId: this.route.snapshot.paramMap.get('chatId'), userId: this.currentUserId}))
  }

}
