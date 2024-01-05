import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Observable, tap} from "rxjs";

import {AuthState} from "../../../state/auth";
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
    this.loadUserChats();
  }

  loadUserChats() {
    const joinedEvents = this.store.selectSnapshot(UserState.userActivities).joinedEvents;
    const chatIds = joinedEvents.map(event => event.chatId);
    this.store.dispatch(new LoadUserChats({chatIds}))
  }

  getChat(id: string) {
    this.router.navigate([id], { relativeTo: this.route})
  }

  get chatRooms() {
    return this.store.selectSnapshot(UserState.userActivities).chats;
  }

  getUsers() {
    this.users = this.chatService.getUsers();
  }
}
