import { Injectable } from '@angular/core';
import { addDays, differenceInMinutes, parseISO, format } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class SonoService {

  private criarDataHoje(hora: string): Date {
    const hoje = new Date();
    const [hours, minutes] = hora.split(':');
    const data = new Date(hoje);
    data.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return data;
  }

  calcularDuracao(horaDormiu: string, horaAcordou: string) {
    let inicio = this.criarDataHoje(horaDormiu);
    let fim = this.criarDataHoje(horaAcordou);

    if (fim < inicio) {
      fim = addDays(fim, 1);
    }

    const minutos = differenceInMinutes(fim, inicio);

    return {
      minutos,
      texto: this.formatarDuracao(minutos),
      inicio: inicio.toISOString(),
      fim: fim.toISOString()
    };
  }

  private formatarDuracao(minutos: number): string {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    
    if (h === 0) return `${m}min`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}min`;
  }

  getTimestampAgora(): string {
    return new Date().toISOString();
  }
}