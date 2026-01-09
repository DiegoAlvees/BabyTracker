import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  type FormGroup,
  Validators,
} from '@angular/forms';
import { Baby, LucideAngularModule, Mail, LockKeyhole } from 'lucide-angular';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, LucideAngularModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly BabyIcon = Baby;
  readonly MailIcon = Mail;
  readonly KeyIcon = LockKeyhole;

  protected form!: FormGroup;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  protected submit() {
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: (token: string) => {
        this.authService.saveToken(token);
        this.router.navigate(['/atividades']);
        console.log('Login bem-sucedido');
      },
      error: (err: any) => {
        console.error('Erro no login', err);
      },
    });
  }
}
