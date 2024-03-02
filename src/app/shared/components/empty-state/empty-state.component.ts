import {CommonModule} from "@angular/common";
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EmptyStateComponent {
  @Input() icon: string = 'chatbubbles-outline';
  @Input() title: string = 'No items here';
  @Input() message: string = 'Nothing to see here, please move along.';
  @Input() actionButtonText?: string;
  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}
