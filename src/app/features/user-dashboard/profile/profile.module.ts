import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";
import {OverflowCheckDirective} from "../../../shared/directive/overflow-check.directive";

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    OverflowCheckDirective,
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
