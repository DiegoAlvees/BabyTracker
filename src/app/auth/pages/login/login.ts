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
import { AuthService } from '../../services/auth.service';
import type { LoginRequest } from '../../models/login/login-request';
import type { User } from '../../models/user/user.model';
import { BabyService } from '../../services/baby.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, LucideAngularModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  readonly BabyIcon = Baby;
  readonly MailIcon = Mail;
  readonly KeyIcon = LockKeyhole;

  protected form!: FormGroup;
  mensagemErro: string = '';
  

  constructor(private fb: FormBuilder, private authService: AuthService, private babyService: BabyService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  

  protected submit() {
    if (this.form.invalid) return;

    this.mensagemErro = '';

    const dados: LoginRequest = {
      email: this.form.value.email,
      senhaHash: this.form.value.senha,
    };

    this.authService.login(dados).subscribe({
      next: (response) => {
        const user: User = {
          id: response.userId,
          nome: response.nome,
          email:response.email,
        }
        console.log('Login realizado com sucesso:', response);
        this.authService.saveUser(user)

        this.babyService.getBaby().subscribe({
        next: (baby) => {
          if (baby) {
            this.router.navigate(['/atividades']);
          } else {
            this.router.navigate(['/cadastro-bebe']);
          }
        },
        error: () => {
          this.router.navigate(['/cadastro-bebe']);
        }
      });

      },
      error: (erro) => {
        console.error('Erro ao fazer login:', erro);
        this.mensagemErro = erro.error?.error || 'Erro ao fazer login.';
      }
    });

    
  }
}