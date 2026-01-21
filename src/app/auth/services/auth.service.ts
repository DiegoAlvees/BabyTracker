import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { RegisterRequest } from '../models/register/register-request';
import { API_URL } from '../../config/api.config';
import type { LoginRequest } from '../models/login/login-request';
import type { RegisterResponse } from '../models/register/register-response';
import type { LoginResponse } from '../models/login/login-response';
import type { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<RegisterResponse> {
   return this.http.post<RegisterResponse>(`${API_URL}/auth/register`, data)
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, data);
  }

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) as User : null;
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}