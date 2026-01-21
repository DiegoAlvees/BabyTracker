import { Component } from '@angular/core';
import {
  FormsModule,
  Validators,
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Baby, CalendarDays, LucideAngularModule } from 'lucide-angular';
import { birthDateValidator } from '../../../validators/validations-errors';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BabyService } from '../../services/baby.service';
import type { BabyRequest } from '../../models/baby/baby-request';

@Component({
  selector: 'app-register-baby',
  imports: [LucideAngularModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [],
  templateUrl: './register-baby.html',
})
export class RegisterBaby {
  readonly BabyIcon = Baby;
  readonly calendarIcon = CalendarDays;

  protected form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private babyservice: BabyService,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        babyName: ['', [Validators.required, Validators.minLength(3)]],
        babyBirthDate: ['', [Validators.required]],
      },
      {
        validators: [birthDateValidator],
        updateOn: 'blur',
      },
    );
  }

  logout() {
    this.authService.logout();
  }

  submit() {
    if (this.form.invalid) {
      console.log('Formulário invalido');
      return;
    }

    const userId = this.authService.getUserId();
    if (userId === null) {
      console.error('Usuário não autenticado');
      return;
    }

    const dados: BabyRequest = {
      nome: this.form.value.babyName,
      dataNascimento: this.form.value.babyBirthDate,
      user: {
        id: userId,
      },
    };

    this.babyservice.createBaby(dados).subscribe({
      next: (response) => {
        console.log('Bebê cadastrado com sucesso:', response);
        this.router.navigate(['/atividades']);
      },
    });
  }
}
