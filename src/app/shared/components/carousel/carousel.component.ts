import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit} from '@angular/core';
import {CarouselItem} from "../../models/interfaces/carousel";
import {IonicSlides} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class CarouselComponent  implements OnInit {
  @Input() slides?: CarouselItem[]
  swiperModules = [IonicSlides];
  constructor() { }

  ngOnInit() {}

}
