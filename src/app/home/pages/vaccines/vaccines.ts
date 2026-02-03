import { Component } from '@angular/core';
import { CalendarDays, CalendarOff, CircleCheckBig, Clock4, LucideAngularModule, Syringe } from 'lucide-angular';
import { VaccineCard } from "../../components/vaccine-card/vaccine-card";

@Component({
  selector: 'app-vaccines',
  imports: [LucideAngularModule, VaccineCard],
  templateUrl: './vaccines.html',
})
export class Vaccines {
  readonly calendarOffIcon = CalendarOff
  readonly calendarIcon = CalendarDays
  readonly syringeIcon = Syringe
  readonly checkIcon = CircleCheckBig
  readonly timeIcon = Clock4
}
