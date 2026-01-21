import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-banho',
  imports: [],
  templateUrl: './modal-banho.html',
})
export class ModalBanho {
 @Output() close = new EventEmitter<void>();
@Output() confirm = new EventEmitter<void>();
}
