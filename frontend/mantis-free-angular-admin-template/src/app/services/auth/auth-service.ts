// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  token: string;
  expiration: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = signal<boolean>(false);
  isAuthenticated = this._isAuthenticated.asReadonly();

  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, private router: Router) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this._isAuthenticated.set(true);
    }
  }
  login(username: string, password: string) {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/Auth/Login`,
      { username, password }
    ).pipe(
      tap(resp => {
        if (resp.token) {
          sessionStorage.setItem('token', resp.token);
          sessionStorage.setItem('token_exp', resp.expiration);
          // sessionStorage.setItem('usuario', resp.token);

          this._isAuthenticated.set(true);
        }
      })
    );
  }

  /** Logout: elimina token, marca no autenticado, redirige a login */
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('token_exp');
    this._isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
