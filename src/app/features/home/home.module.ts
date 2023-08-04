import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { FooterModule } from "../../core/footer/footer.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    RouterModule,
    FooterModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
