import { Routes } from '@angular/router';
import { Login } from './auth/pages/login/login';
import { Register } from './auth/pages/register/register';
import { Activities} from './home/pages/activities/activities';
import { AuthGuard } from './auth/guard/auth.guard';
import { RegisterBaby } from './auth/pages/register-baby/register-baby';
import { BabyGuard } from './auth/guard/baby.guard';
import { NoBabyGuard } from './auth/guard/no-baby.guard';
import { AuthLayout } from './home/layout/auth-layout/auth-layout';
import { Vaccines } from './home/pages/vaccines/vaccines';
import { Profile } from './home/pages/profile/profile';
import { History } from './home/pages/history/history';

export const routes: Routes = [
  { path: '', redirectTo: 'atividades', pathMatch: 'full' },

  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },
  {
    path: 'cadastro-bebe',
    component: RegisterBaby,
    canActivate: [AuthGuard, NoBabyGuard],
  },

  {
    path: '',
    component: AuthLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'atividades',
        component: Activities,
        canActivate: [BabyGuard],
      },
      {
        path: 'vacinas',
        component: Vaccines,
        canActivate: [BabyGuard]
      },
       {
        path: 'perfil',
        component: Profile,
        canActivate: [BabyGuard]
      },
       {
        path: 'historico',
        component: History,
        canActivate: [BabyGuard]
      }
    ],
  },

  { path: '**', redirectTo: 'auth/login' },
];
