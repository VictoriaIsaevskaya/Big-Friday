import {CommonModule} from "@angular/common";
import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {IonicModule, ModalController} from '@ionic/angular';


@Component({
  selector: 'app-auth-prompt',
  templateUrl: './should-auth-modal.component.html',
  styleUrls: ['./should-auth-modal.component.scss'],
  standalone: true,
  imports: [RouterModule, IonicModule, CommonModule]
})
export class ShouldAuthModalComponent {
  constructor(public modalCtrl: ModalController) {
  }

}
