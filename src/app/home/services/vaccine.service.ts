import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap, type Observable } from 'rxjs';
import type { VaccineRequest } from '../models/vaccine/vaccine-request';
import type { VaccineResponse } from '../models/vaccine/vaccine-response';
import { HttpClient } from '@angular/common/http';
import { BabyService } from '../../auth/services/baby.service';
import { API_URL } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class Vaccine {
  private vaccine$ = new BehaviorSubject<VaccineResponse[]>([]);

  constructor(
    private http: HttpClient,
    private babyService: BabyService,
  ) {}

  createVaccine(vaccineData: VaccineRequest): Observable<VaccineResponse> {
    const BabyId = this.babyService.getBabyId();
    if (!BabyId) {
      throw new Error('Baby Id não encontrado');
    }

    return this.http.post<VaccineResponse>(`${API_URL}/vacinas/baby/${BabyId}`, vaccineData).pipe(
      tap((newVaccine) => {
        const current = this.vaccine$.value;
        this.vaccine$.next([...current, newVaccine]);
      }),
    );
  }

  deleteVaccine(vaccineId: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/vacinas/${vaccineId}`).pipe(
      tap(() => {
        const current = this.vaccine$.value;
        const updated = current.filter((vaccine) => vaccine.id !== vaccineId);
        this.vaccine$.next(updated);
      }),
    );
  }

  getVaccines(tomadas: boolean): Observable<VaccineResponse[]> {
    const babyId = this.babyService.getBabyId();
    if (!babyId) {
      throw new Error('Baby Id não encontrado');
    }

    const url = tomadas
      ? `${API_URL}/vacinas/baby/${babyId}/tomadas`
      : `${API_URL}/vacinas/baby/${babyId}/futuras`;

    return this.http
      .get<VaccineResponse[]>(url)
      .pipe(tap((vaccines) => this.vaccine$.next(vaccines)));
  }
}
