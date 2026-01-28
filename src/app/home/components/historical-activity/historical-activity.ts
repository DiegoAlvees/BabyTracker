import { Component, Input } from '@angular/core';
import { Baby, Bath, Clock4, ClockFading, Droplets, LucideAngularModule, Moon } from 'lucide-angular';
import { RoutineService } from '../../services/routine.service';
import type { RotinaRequest } from '../../models/rotina/rotina-request';
import type { RotinaResponse } from '../../models/rotina/rotina-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historical-activity',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './historical-activity.html',
})
export class HistoricalActivity {
  readonly ClockFadingIcon = ClockFading;
  readonly ClockIcon = Clock4;
  readonly BabyIcon = Baby;
  readonly DropletsIcon = Droplets;
  readonly BathIcon = Bath;
  readonly MoonIcon = Moon;

  @Input() routines: RotinaResponse[] = [];
  @Input() mode: 'daily' | 'full' = 'daily';

  constructor(private routineService: RoutineService) {}

  ngOnInit(): void {
    this.carryRoutines();
  }

  carryRoutines() {
    this.routineService.getRoutines().subscribe({
      next: (dados) => {
        const sorted = dados.sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
      
        if (this.mode === 'daily') {
          const today = new Date().toISOString().split('T')[0];
          this.routines = sorted.filter(routine => routine.timeStamp.startsWith(today));
        } else {
          this.routines = sorted
        }
      },
      error: (err) => {
        console.error('Erro ao carregar rotinas:', err);
      }
    })
  }

  getIconForType(tipo: string) {
    switch (tipo) {
      case 'amamentacao':
        return this.DropletsIcon;
      case 'banho':
        return this.BathIcon;
      case 'soneca':
        return this.MoonIcon;
      case 'fralda':
        return this.BabyIcon;
      default:
        return this.ClockFadingIcon;
    }
  }

  getDetailForType(tipo: string, detalhes: any) {
  switch (tipo) {
    case 'amamentacao':
      return `Seio: ${detalhes.lado}, ${detalhes.duracao} minutos`;

    case 'fralda':
      return `Troca: ${detalhes.tipoTroca}`;

    case 'soneca':
      return `Dormiu por ${detalhes.tempoDormido}`;

    case 'banho':
      return '';

    default:
      return '';
  }
}


  getRoutinesByDate() {
    const grouped = new Map<string, RotinaResponse[]>();

    this.routines.forEach(routine => {
      const date = routine.timeStamp.split('T')[0];
      if (!grouped.has(date)) {
        grouped.set(date, []);
      }
      grouped.get(date)?.push(routine);
    });

    return Array.from(grouped.entries());
  }
}