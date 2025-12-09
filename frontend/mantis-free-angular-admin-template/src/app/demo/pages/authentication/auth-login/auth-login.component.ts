import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {
  username = signal<string>('');
  password = signal<string>('');

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    const user = this.username();
    const pass = this.password();
    this.auth.login(user, pass).subscribe({
      next: _ => this.router.navigate(['/dashboard/default']),
      error: err => {
        const msg = err.error?.message || 'Error al iniciar sesión';
        Swal.fire('Error', msg, 'error');
      }
    });
  }
}