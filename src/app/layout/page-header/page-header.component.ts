import {Component, Input} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PageHeaderComponent {
  @Input() pageTitle: string;
  @Input() backRedirectionLink: string
}
