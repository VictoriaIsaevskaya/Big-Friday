import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import {ExploreContainerComponentModule} from "../../explore-container/explore-container.module";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "../../layout/header/header.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ExploreContainerComponentModule,
    HeaderComponent,
  ],
  declarations: [HomePage]
})
export class HomeModule {}
