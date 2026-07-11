import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string; role: string }>(
      `${this.apiUrl}/auth/login`,
      {
        email,
        password,
      },
    );
  }
  registerEmployee(email: string, password: string) {
    return this.http.post<{ id: string; email: string }>(
      `${this.apiUrl}/auth/register`,
      {
        email,
        password,
      },
      {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      },
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
