import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {PageHeaderComponent} from "../../../shared/components/page-header/page-header.component";

import { EventDetailsPageRoutingModule } from './event-details-routing.module';
import { EventDetailsPage } from './event-details.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EventDetailsPageRoutingModule,
        PageHeaderComponent
    ],
  declarations: [EventDetailsPage]
})
export class EventDetailsPageModule {}
