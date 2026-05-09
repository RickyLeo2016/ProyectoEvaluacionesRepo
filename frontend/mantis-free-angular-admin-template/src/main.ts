
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { authInterceptor } from './app/interceptors/auth-error.interceptor';

if (environment.production) {
  enableProdMode();
}



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                     // RUTAS STANDALONE
    provideAnimations(),
    provideHttpClient(
      withInterceptors([authInterceptor])      // INTERCEPTOR STANDALONE
    )
  ]
});
