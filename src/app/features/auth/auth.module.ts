import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

import {AuthPromptModalComponent} from "./auth-prompt-modal/auth-prompt-modal.component";
import {LoginFormComponent} from "./login-form/login-form.component";



@NgModule({
  declarations: [AuthPromptModalComponent],
  imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule,
      LoginFormComponent,
  ],
  // exports: [LoginFormComponent]
})
export class AuthModule { }
