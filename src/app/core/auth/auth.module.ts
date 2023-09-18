import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

import {AuthPromptModalComponent} from "./auth-prompt-modal/auth-prompt-modal.component";



@NgModule({
  declarations: [AuthPromptModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
