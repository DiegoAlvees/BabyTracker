import { Routes } from '@angular/router';
import { Login } from './auth/pages/login/login';
import { Register } from './auth/pages/register/register';
import { Atividades } from './home/pages/activities/activities';
import { AuthGuard } from './auth/guard/auth.guard';
import { RegisterBaby } from './auth/pages/register-baby/register-baby';
import { BabyGuard } from './auth/guard/baby.guard';
import { NoBabyGuard } from './auth/guard/no-baby.guard';
import { AuthLayout } from './home/layout/auth-layout/auth-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'atividades', pathMatch: 'full' },

  // Rotas que NÃO usam footer (não muda nada)
  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },
  {
    path: 'cadastro-bebe',
    component: RegisterBaby,
    canActivate: [AuthGuard, NoBabyGuard],
  },

  // Rotas que USAM footer
  {
    path: '',
    component: AuthLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'atividades',
        component: Atividades,
        canActivate: [BabyGuard],
      }
      // no futuro: histórico, perfil, etc
    ]
  },

  { path: '**', redirectTo: 'auth/login' },
];

