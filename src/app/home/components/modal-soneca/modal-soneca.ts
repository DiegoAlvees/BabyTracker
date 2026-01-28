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
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { SonoService } from '../../services/sono.service';

@Component({
  selector: 'app-modal-soneca',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './modal-soneca.html',
})
export class ModalSoneca {
  readonly MoonIcon = Moon;
  readonly SunIcon = Sun;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<RotinaRequest>();

  protected form!: FormGroup;
  duracao: string = '';
  resutadoCalculo: any = null;

  constructor(
    private toast: ToastService,
    private fb: FormBuilder,
    private sonoService: SonoService,
  ) {
    this.form = this.fb.group({
      horaDormiu: ['', [Validators.required]],
      horaAcordou: ['', [Validators.required]],
    });
  }

  calcularDuracao() {
    const horaDormiu = this.form.get('horaDormiu')?.value;
    const horaAcordou = this.form.get('horaAcordou')?.value;

    if (horaDormiu && horaAcordou) {
      const resultado = this.sonoService.calcularDuracao(horaDormiu, horaAcordou);
      this.duracao = resultado.texto;
    }
  }

  confirmar() {
    const horaDormiu = this.form.get('horaDormiu')?.value;
    const horaAcordou = this.form.get('horaAcordou')?.value;
    const resultado = this.sonoService.calcularDuracao(horaDormiu, horaAcordou);

    const dados: RotinaRequest = {
      tipo: 'soneca',
      timeStamp: new Date().toISOString(),
      detalhes: {
        tempoDormido: resultado.texto,
      }
    };
    this.confirm.emit(dados);
    this.toast.success('Soneca registrada!');
    this.close.emit();
  }
}
