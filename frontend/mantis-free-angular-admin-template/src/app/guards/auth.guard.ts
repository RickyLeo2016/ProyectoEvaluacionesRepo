import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const AuthGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  // ✅ Validación robusta del token
  if (auth.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/auth/login');
};
