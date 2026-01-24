import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import type { BabyRequest } from '../models/baby/baby-request';
import type { BabyResponse } from '../models/baby/baby-response';
import { map, of, tap, type Observable } from 'rxjs';
import { API_URL } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class BabyService {
  private readonly BABY_STORAGE_KEY = 'baby_data';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createBaby(babyData: BabyRequest): Observable<BabyResponse> {
    const userId = this.authService.getUserId();
    return this.http.post<BabyResponse>(`${API_URL}/babies`, babyData).pipe(
      tap(baby => this.saveBaby(baby))
    );
  }

  getBaby(): Observable<BabyResponse | null> {
    const userId = this.authService.getUserId();

    if (!userId) {
      return of(null);
    }

    const cachedBaby = this.getCachedBaby();
    if (cachedBaby) {
      this.fetchBabyFromApi(userId).subscribe();
      return of(cachedBaby);
    }

    
    return this.fetchBabyFromApi(userId);
  }

  private fetchBabyFromApi(userId: number): Observable<BabyResponse | null> {
    return this.http.get<BabyResponse[]>(`${API_URL}/babies?userId=${userId}`).pipe(
      map(bebes => bebes.length > 0 ? bebes[0] : null),
      tap(baby => {
        if (baby) {
          this.saveBaby(baby);
        }
      })
    );
  }

  private saveBaby(baby: BabyResponse): void {
    localStorage.setItem(this.BABY_STORAGE_KEY, JSON.stringify(baby));
  }

  private getCachedBaby(): BabyResponse | null {
    const babyData = localStorage.getItem(this.BABY_STORAGE_KEY);
    return babyData ? JSON.parse(babyData) as BabyResponse : null;
  }

  getBabyId(): number | null {
    return this.getCachedBaby()?.id ?? null
  }
  
  clearBabyCache(): void {
    localStorage.removeItem(this.BABY_STORAGE_KEY);
  }
}