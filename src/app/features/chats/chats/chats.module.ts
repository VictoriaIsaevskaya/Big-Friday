import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";

import { ChatPageRoutingModule } from './chats-routing.module';
import { ChatsPage } from './chats.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatPageRoutingModule,
        PageHeaderComponent
    ],
  declarations: [ChatsPage]
})
export class ChatPageModule {}
