import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { required } from '@angular/forms/signals';
import { LucideAngularModule, Timer } from 'lucide-angular';

@Component({
  selector: 'app-modal-amamentacao',
  imports: [LucideAngularModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-amamentacao.html',
})
export class ModalAmamentacao {
  readonly timerIcon = Timer;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  protected form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      duracao: ['',[Validators.required, Validators.pattern("^[0-9]+$")]],
      mamilo: ['',[Validators.required]],
    })
  }

  mamiloSelecionado: 'esquerdo' | 'direito' | 'ambos' | null = null;

  selecionarMamilo(mamilo: 'esquerdo' | 'direito' | 'ambos') {
    this.mamiloSelecionado = mamilo;
  }
}
