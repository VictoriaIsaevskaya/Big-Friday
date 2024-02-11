import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {filter, map, Observable} from "rxjs";

import {ChatState} from "../../state/chat";

import {FOOTER_TABS} from "./constants";

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.page.html',
  styleUrls: ['footer.page.scss']
})
export class FooterPage {
  isChatPage$: Observable<boolean>;
  unreadMessagesCount$ = this.store.select(ChatState.unreadMessagesCount);



  constructor(private store: Store,
              private router: Router) {
    this.isChatPage$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).urlAfterRedirects === '/chats'),
    );
  }

  tabs = FOOTER_TABS;
}
