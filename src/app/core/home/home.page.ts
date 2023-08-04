import { Component } from '@angular/core';
import {CarouselItem} from "../../shared/models/interfaces/carousel";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  slides: CarouselItem[] = [
    { item: 'assets/images/alcohol.jpg' },
    { item: 'assets/images/beach.jpg' },
    { item: 'assets/images/concert.jpg' },
    { item: 'assets/images/bubbles.jpg' },
  ]

  constructor() {}

}
