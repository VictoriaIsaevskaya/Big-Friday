import { CommonModule } from "@angular/common";
import { Component, Input } from '@angular/core';
import { RouterModule } from "@angular/router";
import { IonicModule, PopoverController } from "@ionic/angular";


@Component({
  selector: 'app-expandable-text',
  templateUrl: './expandable-text.component.html',
  styleUrls: ['./expandable-text.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ExpandableTextComponent {
  @Input() text: string;

  constructor(
    private popoverController: PopoverController,
  ) { }

  closePopover() {
    this.popoverController.dismiss();
  }


}
