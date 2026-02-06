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
export class VaccineService {
  private vaccinesTaken$ = new BehaviorSubject<VaccineResponse[]>([]);
  private vaccinesFuture$ = new BehaviorSubject<VaccineResponse[]>([])

  public taken$ = this.vaccinesTaken$.asObservable();
  public future$ = this.vaccinesFuture$.asObservable();

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
        if(newVaccine.status) {
          const current = this.vaccinesTaken$.value;
          this.vaccinesTaken$.next([...current, newVaccine]);
        } else {
          const current = this.vaccinesFuture$.value;
          this.vaccinesFuture$.next([...current, newVaccine])
        }
        
      }),
    );
  }

  deleteVaccine(vaccineId: number, status: boolean): Observable<void> {
    return this.http.delete<void>(`${API_URL}/vacinas/${vaccineId}`).pipe(
      tap(() => {
        if(status) {
          const current = this.vaccinesTaken$.value;
          const updated = current.filter((vaccine) => vaccine.id !== vaccineId);
          this.vaccinesTaken$.next(updated);
        } else {
          const current = this.vaccinesFuture$.value;
          const updated = current.filter((vaccine) => vaccine.id !== vaccineId);
          this.vaccinesFuture$.next(updated);
        }
      }),
    );
  }

  getVaccines(): void {
    const babyId = this.babyService.getBabyId();
    if (!babyId) {
      throw new Error('Baby Id não encontrado');
    }

    this.http
      .get<VaccineResponse[]>(`${API_URL}/vacinas/baby/${babyId}/tomadas`)
      .subscribe((vaccines) => this.vaccinesTaken$.next(vaccines));

    this.http
      .get<VaccineResponse[]>(`${API_URL}/vacinas/baby/${babyId}/futuras`)
      .subscribe((vaccines) => this.vaccinesFuture$.next(vaccines));
  }
}
