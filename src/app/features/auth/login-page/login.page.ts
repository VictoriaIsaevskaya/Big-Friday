import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";
import {LoginFormComponent} from "../login-form/login-form.component";


@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [LoginFormComponent, PageHeaderComponent, IonicModule, RouterModule]
})
export class LoginPage {
}
