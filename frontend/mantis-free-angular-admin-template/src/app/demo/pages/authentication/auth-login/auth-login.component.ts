import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-auth-login',
  imports: [
    SpinnerComponent
  ],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {
  username = signal<string>('');
  password = signal<string>('');
  spinnerVisible = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogin() {
    const user = this.username();
    const pass = this.password();

    if (!this.username() || !this.password() ) {
      Swal.fire('Error', 'Debe ingresar usuario y contraseña', 'warning');
      return;
    }
    this.spinnerVisible.set(true);

    this.auth.login(user, pass).subscribe({
      next: _ => this.router.navigate(['/dashboard/default']),
      error: err => {
        const msg = err.error?.message || 'Error al iniciar sesión';
        Swal.fire('Error', msg, 'error');
        this.spinnerVisible.set(false);
      }
    });
  }

}
