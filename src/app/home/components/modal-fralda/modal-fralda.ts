import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import type { RotinaRequest } from '../../models/rotina/rotina-request';
import  { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-modal-fralda',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-fralda.html',
})
export class ModalFralda {

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<RotinaRequest>();

  protected form!: FormGroup;

  constructor(private fb: FormBuilder, private toast: ToastService) {
    this.form = this.fb.group({
      trocaFralda: ['',[Validators.required]],
    })
  }

  selecionarTrocaFralda(trocaFralda: 'xixi' | 'coco' | 'ambos') {
    this.form.patchValue({ trocaFralda: trocaFralda });
  }

  get trocaFraldaSelecionada() {
    return this.form.get('trocaFralda')?.value;
  }

  confirmar() {
    if (this.form.valid) {
      const dados: RotinaRequest = {
        tipo: 'fralda',
        timeStamp: new Date().toISOString(),
        detalhes: {
          tipoTroca: this.form.value.trocaFralda,
        }
      }
      this.confirm.emit(dados);
      this.toast.success('Troca de fralda registrada!');
      this.close.emit();
    } else {
      this.form.markAllAsTouched()
    }
  }
}
