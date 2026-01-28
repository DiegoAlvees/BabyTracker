import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import type { RotinaRequest } from '../../models/rotina/rotina-request';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-modal-banho',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-banho.html',
})
export class ModalBanho {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<RotinaRequest>();


  constructor(
    private toast: ToastService,
  ) {}

  confirmar() {
    const dados: RotinaRequest = {
      tipo: 'banho',
      timeStamp: new Date().toISOString(),
      detalhes: {},
    };
    this.confirm.emit(dados);
    this.toast.success('Banho registrado!');
    this.close.emit();
  }
}
