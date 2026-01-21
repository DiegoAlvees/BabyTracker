import { Component, type OnInit } from '@angular/core';
import { Baby, LucideAngularModule } from 'lucide-angular';
import type { BabyResponse } from '../../../auth/models/baby/baby-response';
import { BabyService } from '../../../auth/services/baby.service';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  readonly BabyIcon = Baby;

  baby: BabyResponse | null = null;
  age: string = '';

  constructor(private babyService: BabyService) {}

  ngOnInit(): void {
    this.babyService.getBaby().subscribe({
      next: (baby) => {
        this.baby = baby;
        if (baby) {
          this.age = this.calculateAge(baby.dataNascimento);
        }
      },
      error: (erro) => {
        console.error('Erro ao obter dados do bebê:', erro);
      },
    });
  }

  calculateAge(dateOfBirth: string): string {
  const today = new Date();
  const birth = new Date(dateOfBirth);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const ultimoDiaMesAnterior = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += ultimoDiaMesAnterior;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years >= 1) {
    return `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`;
  } else if (months >= 1) {
    return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  } else {
    return `${days} ${days === 1 ? 'dia' : 'dias'}`;
  }
}

}
