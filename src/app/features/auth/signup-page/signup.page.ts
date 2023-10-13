import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";

import {PageHeaderComponent} from "../../../layout/page-header/page-header.component";
import {PreferencesComponent} from "../../../modals/preferences/preferences.component";


@Component({
  selector: 'app-home',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
  standalone: true,
  imports: [PageHeaderComponent, IonicModule, RouterModule, PreferencesComponent]
})
export class SignupPage {

}
