import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Baby, CalendarDays, LockKeyhole, LucideAngularModule, Mail } from 'lucide-angular';
import { birthDateValidator, passwordMatchValidator } from '../../../validators/validations-errors';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [LucideAngularModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly BabyIcon = Baby;
  readonly MailIcon = Mail;
  readonly KeyIcon = LockKeyhole;
  readonly dateIcon = CalendarDays;

  protected form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        babyName: ['', [Validators.required]],
        babyBirthDate: ['', [Validators.required]],
      },
      {
        validators: [passwordMatchValidator, birthDateValidator],
        updateOn: 'blur',
      }
    );
  }

  protected submit() {
    if (this.form.invalid) {
      console.log('Formulario invalido');
      return;
    }

    const { email, senha, babyName, babyBirthDate } = this.form.value;

    const userPayload = {
      nome: email,
      email: email,
      senhaHash: senha,
    };

    this.authService.registerUser(userPayload).subscribe({
      next: (user: any) => {
        const userId = user.id;

        const babyPayload = {
          nome: babyName,
          dataNascimento: babyBirthDate,
        };

        this.authService
          .createBaby(userId, babyPayload)
          .subscribe({
            next: (baby: any) => {
              console.log('usuario e bebe criados', user, baby);
              this.router.navigate(['/auth/login']);
            },
            error: (err: any) => {
              console.error('Erro ao criar o bebê', err);
            },
          });
      },
      error: (err: any) => {
        console.error('Erro ao registrar o usuário', err);
      },
    });
  }
}
