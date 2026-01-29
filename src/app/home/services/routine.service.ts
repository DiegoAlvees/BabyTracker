import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { RotinaRequest } from '../models/rotina/rotina-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import type { RotinaResponse } from '../models/rotina/rotina-response';
import { API_URL } from '../../config/api.config';
import { BabyService } from '../../auth/services/baby.service';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
private routine$ = new BehaviorSubject<RotinaResponse[]>([]);

getRoutineState(){
  return this.routine$.asObservable()
}

  constructor(
    private http: HttpClient,
    private babyService: BabyService,
  ) {}

  createRoutine(rotinaData: RotinaRequest): Observable<RotinaResponse> {
    const babyId = this.babyService.getBabyId();
    if (!babyId) {
      throw new Error('Baby ID não encontrado');
    }
    return this.http.post<RotinaResponse>(`${API_URL}/babies/${babyId}/rotinas`, rotinaData)
    .pipe(tap((newRoutine) => {
      const current = this.routine$.value;
      this.routine$.next([...current, newRoutine])
    }))
  }

  deleteRoutine(rotinaId: number): Observable<void> {
    const babyId = this.babyService.getBabyId();
    if (!babyId) {
      throw new Error('Baby ID não encontrado');
    }
    return this.http.delete<void>(`${API_URL}/babies/${babyId}/rotinas/${rotinaId}`);
  }

  getRoutines(): Observable<RotinaResponse[]> {
    const babyId = this.babyService.getBabyId();

    if (!babyId) {
      throw new Error('Baby ID não encontrado');
    }

    return this.http.get<RotinaResponse[]>(`${API_URL}/babies/${babyId}/rotinas`)
    .pipe(tap((routines) => this.routine$.next(routines)))

  }
}
