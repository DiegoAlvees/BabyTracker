import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import type { BabyRequest } from '../models/baby/baby-request';
import type { BabyResponse } from '../models/baby/baby-response';
import { BehaviorSubject, map, of, tap, type Observable } from 'rxjs';
import { API_URL } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class BabyService {
  private readonly BABY_STORAGE_KEY = 'baby_data';

  private babySubject = new BehaviorSubject<BabyResponse | null>(null)
  public baby$ = this.babySubject.asObservable()

  constructor(private http: HttpClient, private authService: AuthService) {
    const cachedBaby = this.getCachedBaby();
    if (cachedBaby && this.isValidCache(cachedBaby)) {
      this.babySubject.next(cachedBaby);
    } else {
      this.clearBabyCache();
    }
  }

  createBaby(babyData: BabyRequest): Observable<BabyResponse> {
    return this.http.post<BabyResponse>(`${API_URL}/babies`, babyData).pipe(
      tap(baby => {
        this.saveBaby(baby)
        this.babySubject.next(baby)
      })
    );
  }

  getBaby(): Observable<BabyResponse | null> {
    const userId = this.authService.getUserId();

    if (!userId) {
      return of(null);
    }

    const cachedBaby = this.getCachedBaby();
    if (cachedBaby && this.isValidCache(cachedBaby)) {
      
      this.fetchBabyFromApi(userId).subscribe();
      return this.baby$
    }

    
    return this.fetchBabyFromApi(userId);
  }

  private fetchBabyFromApi(userId: number): Observable<BabyResponse | null> {
    return this.http.get<BabyResponse[]>(`${API_URL}/babies?userId=${userId}`).pipe(
      map(bebes => bebes.length > 0 ? bebes[0] : null),
      tap(baby => {
        if (baby) {
          this.saveBaby(baby);
          this.babySubject.next(baby)
        } else {
          this.babySubject.next(null);
        }
      })
    );
  }

  private saveBaby(baby: BabyResponse): void {
    const userId = this.authService.getUserId();
    const dataToSave = {
      ...baby,
      cachedUserId: userId
    };
    localStorage.setItem(this.BABY_STORAGE_KEY, JSON.stringify(dataToSave));
  }

  private getCachedBaby(): (BabyResponse & { cachedUserId?: number }) | null {
    const babyData = localStorage.getItem(this.BABY_STORAGE_KEY);
    return babyData ? JSON.parse(babyData) : null;
  }

  private isValidCache(cachedBaby: BabyResponse & { cachedUserId?: number }): boolean {
    const currentUserId = this.authService.getUserId();
    return cachedBaby.cachedUserId === currentUserId;
  }

  getBabyId(): number | null {
    const cachedBaby = this.getCachedBaby();
    if (cachedBaby && this.isValidCache(cachedBaby)) {
      return cachedBaby.id;
    }
    return null;
  }
  
  clearBabyCache(): void {
    localStorage.removeItem(this.BABY_STORAGE_KEY);
    this.babySubject.next(null);
  }

  updateBaby(babyId: number, data: Partial<{ nome: string; dataNascimento: string }>) {
    return this.http.put<BabyResponse>(`${API_URL}/babies/${babyId}`, data).pipe(
      tap(updatedBaby => {
        this.saveBaby(updatedBaby)
        this.babySubject.next(updatedBaby)
      })
    )
  }
}