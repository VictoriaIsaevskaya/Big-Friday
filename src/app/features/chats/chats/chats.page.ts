import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Observable, tap} from "rxjs";

import {AuthState} from "../../../state/auth";
import {UserState} from "../../../state/user";
import {ChatService} from "../chat.service";
import {IChatRoom} from "../model/interfaces/chat.interface";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  private destroyRef = inject(DestroyRef);

  segment = 'chats';
  users: Observable<any>
  currentUserId = this.store.selectSnapshot(AuthState.user).uid;
  chatRooms: IChatRoom[];
  // chatRooms: IChatRoom[] = [
  //   {id: '1', name: 'Bowling night', image: 'https://i.pravatar.cc/385', message: 'message'},
  //   {id: '2', name: 'Sea fishing', image: 'https://i.pravatar.cc/386', message: 'message'},
  //   {id: '3', name: 'Beach volleyball', image: 'https://i.pravatar.cc/387', message: 'message'}
  // ]

  constructor(private router: Router, private route: ActivatedRoute, private store: Store, private chatService: ChatService
              ) {}

  ngOnInit() {
    this.loadUserChats();
  }

  loadUserChats() {
    const joinedEvents = this.store.selectSnapshot(UserState.userActivities).joinedEvents;
    const chatIds = joinedEvents.map(event => event.chatId);
    this.chatService.loadAllChats(chatIds).pipe(
      tap(chats => this.chatRooms = chats),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  getChat(id: string) {
    this.router.navigate([id], { relativeTo: this.route})
  }

  getUsers() {
    this.users = this.chatService.getUsers();
  }

  onSegmentChanged(event: HTMLElement) {
    console.log(event)
  }
}
