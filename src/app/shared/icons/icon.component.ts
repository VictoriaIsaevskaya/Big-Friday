import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent  implements OnInit {
  @Input() name: string = '';
  iconPath: string = '';

  ngOnInit(): void {
    this.iconPath = `/assets/icons/${this.name}.svg`;
  }
}
