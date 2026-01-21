import { Injectable } from '@angular/core';
import { CanActivate, Router, type UrlTree } from '@angular/router';
import { BabyService } from '../services/baby.service';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BabyGuard implements CanActivate {
  constructor(private babyService: BabyService, private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {

    if (!this.authService.isLoggedIn()) {
      return of(this.router.createUrlTree(['/auth/login']));
    }
    
    return this.babyService.getBaby().pipe(
        map(baby => {
            if (baby) {
                return true;
            }

            return this.router.createUrlTree(['/cadastro-bebe']);
        }),
        catchError(() => of(this.router.createUrlTree(['/cadastro-bebe'])))
    )
  }
}
