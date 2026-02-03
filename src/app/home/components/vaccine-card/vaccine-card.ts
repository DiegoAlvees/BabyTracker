import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-vaccine-card',
  imports: [LucideAngularModule],
  templateUrl: './vaccine-card.html',
  styles: ``,
})
export class VaccineCard {
@Input() config?: { iconTitulo: any; iconMensagem: any; titulo: string; mensagem: string }

}
