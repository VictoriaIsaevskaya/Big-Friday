import { Component } from '@angular/core';

@Component({
  selector: 'app-active-pastime',
  templateUrl: './active-pastime.component.html',
  styleUrls: ['./active-pastime.component.scss'],
})
export class ActivePastimeComponent {
  path = '../../../assets/images/';
  activities = [
    {
      activity: 'bowling',
      img: `${this.path}bowling.jpg`,
      icon: 'bowling-ball-outline'
    },
    {
      activity: 'drinking',
      img: `${this.path}alcohol.jpg`,
      icon: 'wine-outline'
    },
    {
      activity: 'playing kids',
      img: `${this.path}bubbles.jpg`,
      icon: 'happy-outline'
    },
    {
      activity: 'clubing',
      img: `${this.path}concert.jpg`,
      icon: 'musical-notes-outline'
    },
    {
      activity: 'barbecue',
      img: `${this.path}barbecue.jpg`,
      icon: 'flame-outline'
    },
    {
      activity: 'soccer',
      img: `${this.path}soccer.jpg`,
      icon: 'football-outline'
    },
    {
      activity: 'volleyball',
      img: `${this.path}volleyball.jpg`,
      icon: 'baseball-outline'
    },
  ]

  constructor() { }

  goToActivity(activity: string) {
    console.log(activity)
  }

}
