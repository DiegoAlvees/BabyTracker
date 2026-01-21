import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-action-button',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './action-button.html',
})
export class ActionButton {
@Input() label: string = '';
@Input() bgClass: string = '';
@Input() icon!: LucideIconData
@Output() clicked = new EventEmitter<void>()
}
