import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Baby, CalendarDays, LucideAngularModule } from 'lucide-angular';
import { birthDateValidator } from '../../../validators/validations-errors';
import type { UpdateBabyRequest } from '../../../auth/models/baby/update-baby-request';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-modal-profile',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './modal-profile.html',
  styles: ``,
})
export class ModalProfile {
  readonly babyIcon = Baby;
  readonly calendarIcon = CalendarDays;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<UpdateBabyRequest>()

  protected form!: FormGroup;
  submeted = false

  constructor(private fb: FormBuilder, private toast: ToastService) {
    this.form = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        dataNascimento: ['', [Validators.required]],
      },
      {
        validators: [birthDateValidator("dataNascimento")],
      },
    );
  }

  submit() {
    this.submeted = true

    if(this.form.valid) {

      const dados: UpdateBabyRequest = {
        nome: this.form.value.nome,
        dataNascimento: this.form.value.dataNascimento
      }
      this.confirm.emit(dados)
      this.toast.success('Dados do bebe editados com sucesso!')
      this.close.emit()
    }
  }
}
