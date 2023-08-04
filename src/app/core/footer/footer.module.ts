import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterRoutingModule } from './footer-routing.module';

import { FooterPage } from './footer.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FooterRoutingModule
  ],
  declarations: [FooterPage]
})
export class FooterModule {}
