import { Component, type OnInit } from '@angular/core';
import {
  CalendarDays,
  CalendarOff,
  CircleCheckBig,
  Clock4,
  LucideAngularModule,
  Syringe,
} from 'lucide-angular';
import { VaccineCard } from '../../components/vaccine-card/vaccine-card';
import { ModalVaccine } from '../../components/modal-vaccine/modal-vaccine';
import type { VaccineRequest } from '../../models/vaccine/vaccine-request';
import { VaccineService } from '../../services/vaccine.service';
import { Observable } from 'rxjs';
import type { VaccineResponse } from '../../models/vaccine/vaccine-response';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-vaccines',
  imports: [LucideAngularModule, VaccineCard, ModalVaccine, CommonModule],
  templateUrl: './vaccines.html',
})
export class Vaccines implements OnInit {
  readonly calendarOffIcon = CalendarOff;
  readonly calendarIcon = CalendarDays;
  readonly syringeIcon = Syringe;
  readonly checkIcon = CircleCheckBig;
  readonly timeIcon = Clock4;

  vaccinesTaken$!: Observable<VaccineResponse[]>;
  vaccinesFuture$!: Observable<VaccineResponse[]>;

  modalAberto = false;

  constructor(
    private vaccineService: VaccineService,
    private toast: ToastService,
  ) {
    this.vaccinesTaken$ = this.vaccineService.taken$;
    this.vaccinesFuture$ = this.vaccineService.future$;
  }

  ngOnInit(): void {
    this.vaccineService.getVaccines();
  }

  openModal() {
    this.modalAberto = true;
  }

  closeModal() {
    this.modalAberto = false;
  }

  saveVaccine(dados: VaccineRequest) {
    this.vaccineService.createVaccine(dados).subscribe({
      next: (res) => console.log('Vacina salva com sucesso', res),
      error: (err) => console.log('Erro ao salvar vacina:', err),
    });
  }

  deleteVaccine(event: { id: number; status: boolean }) {
    this.toast.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        this.vaccineService.deleteVaccine(event.id, event.status).subscribe(() => {
          this.toast.success('Vacina deletada com sucesso!');
        });
      }
    });
  }
}
