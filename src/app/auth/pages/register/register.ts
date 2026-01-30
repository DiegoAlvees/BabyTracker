import { Component, ChangeDetectorRef} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {LockKeyhole, LucideAngularModule, Mail, User } from 'lucide-angular';
import { passwordMatchValidator } from '../../../validators/validations-errors';
import { AuthService } from '../../services/auth.service';
import type { RegisterRequest } from '../../models/register/register-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [LucideAngularModule, ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
})
export class Register {
  readonly MailIcon = Mail;
  readonly KeyIcon = LockKeyhole;
  readonly userIcon = User

  protected form!: FormGroup;
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required]],
      },
      {
        validators: [passwordMatchValidator],
      
      }
    );
  }

  protected submit() {
    if (this.form.invalid) {
      console.log('Formulário inválido');
      return;
    }



    this.mensagemErro = '';
    this.carregando = true;

    const dados: RegisterRequest = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      senhaHash: this.form.value.senha,
    }


    this.authService.register(dados).subscribe({
      next: (response) => {
        console.log('Registrado com sucesso:', response);
        
        this.carregando = false;
        this.router.navigate(['cadastro-bebe']);
      },
      error: (erro) => {
        console.error('Erro ao registrar:', erro);
        this.carregando = false;
        
       console.error('Erro ao registrar:', erro);
        this.carregando = false;
        console.log("erro para cadastrar")
        this.mensagemErro = erro.error?.error;
        console.log("erro para cadastrar 2", this.mensagemErro)
      this.cdr.detectChanges();
      console.log('Mensagem de erro:', this.mensagemErro);
              }
    });
  }
}
