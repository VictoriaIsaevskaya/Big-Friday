import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {Storage} from '@ionic/storage-angular';

import {AuthPromptModalComponent} from "../auth/auth-prompt-modal/auth-prompt-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  constructor(private storage: Storage, private modalController: ModalController, private router: Router) {
    // this.initStorage();
    // this.removePreferences()
  }

  ngOnInit() {
    return
    // console.log('preferences', this.getPreferences())
  }

  async initStorage() {
    await this.storage.create();
  }

  async openPreferencesModal() {
    this.openAuthPromptModal()
    // if (!(await this.hasPreferences())) {
    //   const modal = await this.modalController.create({
    //     component: PreferencesComponent
    //   });
    //   return await modal.present();
    // } else {

      // this.router.navigate(['/events']);
    // }

  }

  private async openAuthPromptModal() {
    const modal = await this.modalController.create({
      component: AuthPromptModalComponent
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    // if (data && data.loggedIn) {
      this.router.navigate(['/events']);
    // }
  }

  async hasPreferences() {
    const preferences = await this.storage.get('userPreferences');
    return preferences !== null;
  }

  async getPreferences() {
    return await this.storage.get('userPreferences');
  }

  async removePreferences() {
    await this.storage.remove('userPreferences');
  }

}
