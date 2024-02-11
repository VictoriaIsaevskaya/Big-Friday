import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";

import {AuthState} from "../../../state/auth";
import {ChatState, ResetAllUnreadMessages, ResetChatUnreadMessages} from "../../../state/chat";
import {LoadUserChats, UserState} from "../../../state/user";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  users: Observable<any>
  currentUserId = this.store.selectSnapshot(AuthState.user).uid;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store, private chatService: ChatService
              ) {}

  ngOnInit() {
    if (!this.store.selectSnapshot(ChatState.chats)?.length) {
      this.loadUserChats();
    }
    this.store.dispatch(new ResetAllUnreadMessages())
  }

  loadUserChats() {
    const joinedEvents = this.store.selectSnapshot(UserState.userActivities).joinedEvents;
    const chatIds = joinedEvents.map(event => event.chatId);
    this.store.dispatch(new LoadUserChats({chatIds}))
  }

  getChat(chatId: string) {
    if (chatId && this.currentUserId) {
      this.store.dispatch(new ResetChatUnreadMessages({chatId, userId: this.currentUserId}))
      this.router.navigate([chatId], { relativeTo: this.route})
    }

  }

  get chatRooms() {
    return this.store.selectSnapshot(ChatState.chats);
  }

  getUsers() {
    this.users = this.chatService.getUsers();
  }
}
