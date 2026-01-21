import { Routes } from '@angular/router';
import { Login } from './auth/pages/login/login';
import { Register } from './auth/pages/register/register';
import { Atividades } from './home/pages/activities/activities';
import { AuthGuard } from './auth/guard/auth.guard';
import { RegisterBaby } from './auth/pages/register-baby/register-baby';
import { BabyGuard } from './auth/guard/baby.guard';
import { NoBabyGuard } from './auth/guard/no-baby.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'atividades', pathMatch: 'full' },

  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },

  {path: 'cadastro-bebe', component: RegisterBaby, canActivate: [AuthGuard, NoBabyGuard]},
  { path: 'atividades', component: Atividades, canActivate: [AuthGuard, BabyGuard] },

  { path: '**', redirectTo: 'auth/login' },
];
