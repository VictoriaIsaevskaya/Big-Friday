import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";
import { CreateEventComponent } from "../../../modals/create-event/create-event.component";
import { EventCardComponent } from '../../../shared/components/event-card/event-card.component';

import { EventsPageRoutingModule } from './events-routing.module';
import { EventsPage } from './events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    EventCardComponent,
    CreateEventComponent,
    PageHeaderComponent,
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
