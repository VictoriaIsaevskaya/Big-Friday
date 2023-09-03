import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsListPageRoutingModule } from './events-list-routing.module';

import { EventsListPage } from './events-list.page';
import { EventCardComponent } from '../../shared/components/event-card/event-card.component';
import {CreateEventComponent} from "../../shared/components/create-event/create-event.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsListPageRoutingModule,
    EventCardComponent,
    CreateEventComponent,
  ],
  declarations: [EventsListPage]
})
export class EventsListPageModule {}
