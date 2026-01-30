import { Component, Input } from '@angular/core';
import { Baby, Bath, Clock4, ClockFading, Droplets, LucideAngularModule, Moon } from 'lucide-angular';
import { RoutineService } from '../../services/routine.service';
import type { RotinaRequest } from '../../models/rotina/rotina-request';
import type { RotinaResponse } from '../../models/rotina/rotina-response';
import { CommonModule } from '@angular/common';
import { map, type Observable } from 'rxjs';

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

  routines$!: Observable<RotinaResponse[]>
  @Input() mode: 'daily' | 'full' = 'daily';

  typeLabelMap: Record<string, string> = {
    amamentacao: 'Amamentação',
    banho: 'Banho',
    soneca: 'Soneca',
    fralda: 'Troca de Fralda',
  };

  constructor(private routineService: RoutineService) {}

  ngOnInit(): void {
    this.routineService.getRoutines().subscribe();
    this.carryRoutines();
  }

  carryRoutines() {
  this.routines$ = this.routineService.getRoutineState().pipe(
    map((dados) => {
      const withLocalTime = dados.map(routine => ({
        ...routine,
        timeStamp: new Date(routine.timeStamp + 'Z').toISOString()
      }));

      const sorted = [...withLocalTime].sort(
        (a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
      );

      if (this.mode === 'daily') {
        const today = new Date().toISOString().split('T')[0];
        return sorted.filter(routine =>
          routine.timeStamp.startsWith(today)
        );
      }

      return sorted;
    })
  );
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
      return `Tipo de troca: ${detalhes.tipoTroca}`;

    case 'soneca':
      return `Dormiu por ${detalhes.tempoDormido}`;

    case 'banho':
      return '';

    default:
      return '';
  }
}


  getRoutinesByDate(): Observable<[string, RotinaResponse[]][]> {
    return this.routines$.pipe(
      map(routines => {
        const grouped = new Map<string, RotinaResponse[]>();

        routines.forEach(routine => {
          const date = routine.timeStamp.split('T')[0];
          if (!grouped.has(date)) {
            grouped.set(date, []);
          }
          grouped.get(date)?.push(routine);
        });

        return Array.from(grouped.entries());
      })
    );
  }

  

  getTypeLabel(type: string): string {
    return this.typeLabelMap[type] || type
  }
}