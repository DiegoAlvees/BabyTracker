import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; senha: string }) {
    return this.http.post(`${this.API}/login`, data, {
      responseType: 'text',
    });
  }

  register(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  registerUser(data: { nome: string; email:string; senhaHash: string}) {
    return this.http.post(`http://localhost:8080/users`, data);
  }

  createBaby(userId: number, data: { nome: string; dataNascimento: string }) {
    return this.http.post(`http://localhost:8080/babies/user/${userId}`, data);
  }
}
