import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";

import {AuthState} from "../../../state/auth";
import {ChatService} from "../chat.service";
import {IChatRoom} from "../model/interfaces/chat.interface";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {
  segment = 'chats';
  users: Observable<any>
  currentUserId = this.store.selectSnapshot(AuthState.user).uid;

  chatRooms: IChatRoom[] = [
    {id: '1', name: 'Bowling night', photo: 'https://i.pravatar.cc/385', message: 'message'},
    {id: '2', name: 'Sea fishing', photo: 'https://i.pravatar.cc/386', message: 'message'},
    {id: '3', name: 'Beach volleyball', photo: 'https://i.pravatar.cc/387', message: 'message'}
  ]

  constructor(private router: Router, private route: ActivatedRoute, private store: Store, private chatService: ChatService
              ) {}
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
