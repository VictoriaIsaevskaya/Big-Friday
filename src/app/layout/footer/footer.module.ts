import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FooterPage } from './footer.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    FooterPage
  ],
  declarations: [FooterPage]
})
export class FooterModule {}
