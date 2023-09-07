import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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
