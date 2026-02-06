import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CircleX, LucideAngularModule } from 'lucide-angular';
import type { VaccineResponse } from '../../models/vaccine/vaccine-response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vaccine-card',
  imports: [LucideAngularModule, DatePipe, LucideAngularModule],
  templateUrl: './vaccine-card.html',
  styles: ``,
})
export class VaccineCard {
readonly clearIcon = CircleX

@Input() config?: { iconTitle: any; iconVaccine:any; iconMessage: any; title: string; message: string };
@Input() vaccines: VaccineResponse[] | null = [];
@Output() delete = new EventEmitter<{id: number; status: boolean}>()

}
