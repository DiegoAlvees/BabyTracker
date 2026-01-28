import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Timer } from 'lucide-angular';
import type { RotinaRequest } from '../../models/rotina/rotina-request';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-modal-amamentacao',
  imports: [LucideAngularModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-amamentacao.html',
})
export class ModalAmamentacao {
  readonly timerIcon = Timer;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<RotinaRequest>();

  protected form!: FormGroup;

  constructor(private fb: FormBuilder, private toast: ToastService) {
    this.form = this.fb.group({
      duracao: ['',[Validators.required, Validators.pattern("^[0-9]+$")]],
      mamilo: ['',[Validators.required]],
    })
  }

  selecionarMamilo(mamilo: 'esquerdo' | 'direito' | 'ambos') {
    this.form.patchValue({ mamilo: mamilo });
  }

  get mamiloSelecionado() {
    return this.form.get('mamilo')?.value;
  }

  confirmar() {
    if (this.form.valid) {
      const dados: RotinaRequest = {
        tipo: 'amamentacao',
        timeStamp: new Date().toISOString(),
        detalhes: {
          lado: this.form.value.mamilo,
          duracao: this.form.value.duracao,
        }
      }
      this.confirm.emit(dados);
      this.toast.success('Amamentação registrada!');
      this.close.emit();
    } else {
      this.form.markAllAsTouched()
    }
  }
}
