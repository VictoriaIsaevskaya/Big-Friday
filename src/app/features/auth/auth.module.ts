import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

import {PageHeaderComponent} from "../../layout/page-header/page-header.component";

import {AuthPromptComponent} from "./auth-prompt/auth-prompt.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {LoginFormComponent} from "./login-form/login-form.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    LoginFormComponent,
    AuthRoutingModule,
    PageHeaderComponent,
    AuthPromptComponent
  ],
})
export class AuthModule { }
