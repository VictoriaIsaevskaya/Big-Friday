import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthPromptComponent} from "./auth-prompt/auth-prompt.component";
import {LoginPage} from "./login-page/login.page";
import {SignupPage} from "./signup-page/signup.page";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },
  {
    path: 'prompt',
    component: AuthPromptComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
