import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import {ExploreContainerComponentModule} from "../../explore-container/explore-container.module";
import {CarouselComponent} from "../../shared/carousel/carousel.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HomeRoutingModule,
    ExploreContainerComponentModule,
    CarouselComponent,
  ],
  declarations: [HomePage]
})
export class HomeModule {}
