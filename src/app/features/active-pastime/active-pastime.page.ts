import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-active-pastime',
  templateUrl: './active-pastime.page.html',
  styleUrls: ['./active-pastime.page.scss'],
})
export class ActivePastimePage {
  path = '../../../assets/images/';
  activities = [
    {
      activity: 'bowling',
      icon: 'bowling-ball-outline'
    },
    {
      activity: 'drinking',
      icon: 'wine-outline'
    },
    {
      activity: 'playing kids',
      icon: 'happy-outline'
    },
    {
      activity: 'clubing',
      icon: 'musical-notes-outline'
    },
    {
      activity: 'barbecue',
      icon: 'flame-outline'
    },
    {
      activity: 'soccer',
      icon: 'football-outline'
    },
    {
      activity: 'volleyball',
      icon: 'baseball-outline'
    },
  ]

  constructor(private navCtrl: NavController, private router: Router) { }

  goToActivity(activity: string) {
    this.router.navigate(['/events', activity]);
  }

  goBack() {
    this.navCtrl.back();
  }

}
