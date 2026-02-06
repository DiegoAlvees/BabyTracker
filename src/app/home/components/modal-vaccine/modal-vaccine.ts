import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { CalendarDays, LucideAngularModule, Syringe } from 'lucide-angular';
import { VaccineRequest } from '../../models/vaccine/vaccine-request';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-modal-vaccine',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './modal-vaccine.html',
  styles: ``,
})
export class ModalVaccine {
  readonly syringeIcon = Syringe;
  readonly calendarIcon = CalendarDays;
  tomada: boolean | null = null;
  submitted = false

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<VaccineRequest>();

  protected form!: FormGroup;

  constructor(private fb: FormBuilder, private toast: ToastService) {
    this.form = this.fb.group({
      vacina: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required]],
      status: [null, Validators.required],
    });
  }

  submit() {
    this.submitted = true

    if(this.form.valid) {
      const dados: VaccineRequest = {
        nome: this.form.value.vacina,
        data: this.form.value.data,
        status: this.form.value.status
        
      }
      this.confirm.emit(dados)
      this.toast.success('Vacina registrada com sucesso')
      this.close.emit()
    }
  }
}
