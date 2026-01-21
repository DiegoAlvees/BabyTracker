import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-fralda',
  imports: [],
  templateUrl: './modal-fralda.html',
})
export class ModalFralda {
 @Output() close = new EventEmitter<void>();
@Output() confirm = new EventEmitter<void>();
}
