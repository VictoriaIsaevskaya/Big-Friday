import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { IonicModule } from '@ionic/angular';

import { PageHeaderComponent } from "../../../layout/page-header/page-header.component";
import { ProfilePageModule } from "../profile/profile.module";

import { DashboardRoutingModule} from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    RouterModule,
    ProfilePageModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardModule {}
