import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class IconComponent  implements OnInit {
  @Input() name: string = '';
  iconPath: string = '';
  ngOnInit(): void {
    this.iconPath = `/assets/icons/${this.name}.svg`;
  }
}
