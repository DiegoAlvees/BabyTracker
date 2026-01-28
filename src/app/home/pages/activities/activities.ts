import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { ActionButton } from '../../../shared/action-button/action-button';
import { ModalAmamentacao } from "../../components/modal-amamentacao/modal-amamentacao";
import { ModalFralda } from "../../components/modal-fralda/modal-fralda";
import { ModalBanho } from "../../components/modal-banho/modal-banho";
import { Baby, Bath, Droplets, LucideAngularModule, Moon, Sun } from 'lucide-angular';
import type { RotinaRequest } from '../../models/rotina/rotina-request';
import  { RoutineService } from '../../services/routine.service';
import { ModalSoneca } from '../../components/modal-soneca/modal-soneca';
import { HistoricalActivity } from "../../components/historical-activity/historical-activity";

@Component({
  selector: 'app-atividades',
  imports: [Header, ActionButton, ModalAmamentacao, ModalFralda, ModalBanho, ModalSoneca, LucideAngularModule, HistoricalActivity],
  templateUrl: './activities.html',
})
export class Atividades {
  readonly BabyIcon = Baby;
  readonly DropletsIcon = Droplets;
  readonly BathIcon = Bath;
  readonly MoonIcon = Moon;
  

constructor(private routineService: RoutineService) {}

  modalAmamentacaoAberto = false;
  modalFraldaAberto = false;
  modalBanhoAberto = false;
  modalSonecaAberto = false;

  openModal(tipo: string) {
    
    if (tipo === 'amamentacao') this.modalAmamentacaoAberto = true;
    if (tipo === 'fralda') this.modalFraldaAberto = true;
    if (tipo === 'banho') this.modalBanhoAberto = true;
    if (tipo === 'soneca') this.modalSonecaAberto = true;
  }

  closeModal(tipo: string) {
    if (tipo === 'amamentacao') this.modalAmamentacaoAberto = false;
    if (tipo === 'fralda') this.modalFraldaAberto = false;
    if (tipo === 'banho') this.modalBanhoAberto = false;
    if (tipo === 'soneca') this.modalSonecaAberto = false;
  }

  saveRoutine(dados: RotinaRequest) {
    this.routineService.createRoutine(dados).subscribe({
      next: (res) => {
        console.log('Rotina salva com sucesso:', res);
      },
      error: (err) => {
        console.error('Erro ao salvar rotina:', err);
      }
    })
  }
}
