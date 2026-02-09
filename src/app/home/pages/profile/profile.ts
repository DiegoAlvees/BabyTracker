import { Component, OnInit } from '@angular/core';
import { Baby, LogOut, LucideAngularModule, User as UserIcon } from 'lucide-angular';
import { BabyService } from '../../../auth/services/baby.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import type { User } from '../../../auth/models/user/user.model';
import { ModalProfile } from '../../components/modal-profile/modal-profile';
import type { UpdateBabyRequest } from '../../../auth/models/baby/update-baby-request';
import type { BabyResponse } from '../../../auth/models/baby/baby-response';
import type { Observable } from 'rxjs';
import {Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, CommonModule, ModalProfile],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  readonly babyIcon = Baby;
  readonly userIcon = UserIcon;
  readonly logoutIcon = LogOut;

  baby$!: Observable<BabyResponse | null>;
  user: User | null = null;

  modalOpen = false;

  constructor(
    private babyService: BabyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.baby$ = this.babyService.baby$;
    this.user = this.authService.getUser();
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    console.log('closeModal() chamado');
    this.modalOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

  UpdateBaby(event: UpdateBabyRequest) {
    const babyId = this.babyService.getBabyId();

    if (babyId === null) {
      console.error('Baby ID não encontrado');
      return;
    }

    this.babyService.updateBaby(babyId, event).subscribe({
      next: () => {
        console.log('Bebê atualizado com sucesso');
        
      },
      error: (err) => {
        console.error('Erro ao atualizar bebê', err);
      },
    });
  }
}
