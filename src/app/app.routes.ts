import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Atividades } from './pages/home/atividades/atividades';
import { authGuard } from './pages/auth/auth-guard';

export const routes: Routes = [
  // rota padrão
  { path: '', redirectTo: 'atividades', pathMatch: 'full' },

  // rotas de auth
  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },

  // rotas do app
  { path: 'atividades', component: Atividades, canActivate: [authGuard] },

  // coringa
  { path: '**', redirectTo: 'auth/login' },
];
