import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/services/menu/menu';
interface LoginResponse {
  token: string;
  expiration: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = signal<boolean>(false);
  public isAuthenticated = this._isAuthenticated.asReadonly();

  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(
    private menuService: MenuService,
    private http: HttpClient, 
    private router: Router) {
    this.restoreSession();
  }



  login(username: string, password: string) {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/Auth/Login`,
      { username, password }
    ).pipe(
      tap(resp => {
        if (resp?.token) {
          sessionStorage.setItem('token', resp.token);
          sessionStorage.setItem('token_exp', resp.expiration);
          this._isAuthenticated.set(true);
        }
      }),
      switchMap(() => this.menuService.ObtenerMenusPorUsuario())
    );
  }




  // 🔄 RESTAURAR SESIÓN
  private restoreSession(): void {
    const token = sessionStorage.getItem('token');
    const expiration = sessionStorage.getItem('token_exp');

    if (!token || !expiration) {
      this._isAuthenticated.set(false);
      return;
    }

    const isExpired = new Date(expiration) < new Date();

    if (isExpired) {
      this.clearSession();
    } else {
      this._isAuthenticated.set(true);
    }
  }

  // 🚪 LOGOUT
  logout(): void {
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }

  private clearSession(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('token_exp');
    this._isAuthenticated.set(false);
  }

  // 🔎 OBTENER TOKEN
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // ✅ VALIDAR AUTENTICACIÓN REAL
  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    const expiration = sessionStorage.getItem('token_exp');

    if (!token || !expiration) return false;

    const isExpired = new Date(expiration) < new Date();
    if (isExpired) {
      this.clearSession();
      return false;
    }

    return true;
  }
}
