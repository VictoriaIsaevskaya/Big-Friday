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
  activeSlideIndex = 0;
  swiper: any;

  @Input() slides: CarouselItem[] = [
    {
      title: 'Open Air',
      date: 'Today 20:00'
    },
    {
      title: 'Food Fest',
      date: 'Tomorrow 18:00'
    },
    {
      title: 'Art Ex',
      date: 'After tomorrow 10:00'
    }
  ];
  swiperModules = [IonicSlides];

  constructor() {
  }

  updateActiveSlide(event: CustomEvent) {
    this.activeSlideIndex = event.detail[0].activeIndex
  }
}
