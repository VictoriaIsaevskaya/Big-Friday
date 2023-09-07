import {CommonModule} from "@angular/common";
import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {IonicSlides} from "@ionic/angular";

import {CarouselItem} from "../../models/interfaces/carousel";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class CarouselComponent {
  @Input() slides?: CarouselItem[]
  swiperModules = [IonicSlides];
  constructor() { }

}
