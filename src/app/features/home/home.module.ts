import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { IonicModule } from '@ionic/angular';

import {ExploreContainerComponentModule} from "../../explore-container/explore-container.module";
import {HeaderComponent} from "../../layout/header/header.component";
import {CarouselComponent} from "../../shared/components/carousel/carousel.component";

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ExploreContainerComponentModule,
    HeaderComponent,
    CarouselComponent,
  ],
  declarations: [HomePage]
})
export class HomeModule {}
