import { Component } from '@angular/core';
import {Store} from "@ngxs/store";

import {ChatState, FetchUnreadMessagesCount} from "../../state/chat";

import {FOOTER_TABS} from "./constants";

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.page.html',
  styleUrls: ['footer.page.scss']
})
export class FooterPage {
  constructor(private store: Store) {
    this.store.dispatch(new FetchUnreadMessagesCount())
  }
  unreadMessagesCount = this.store.select(ChatState.unreadMessagesCount)

  tabs = FOOTER_TABS;
}
