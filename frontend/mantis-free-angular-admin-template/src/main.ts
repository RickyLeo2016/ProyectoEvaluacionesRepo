// import { enableProdMode } from '@angular/core';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';
// import { AppRoutingModule } from './app/app-routing.module';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { environment } from './environments/environment';
// import { AuthErrorInterceptor } from './app/interceptors/auth-error.interceptor';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withInterceptorsFromDi()),
//     importProvidersFrom(AppRoutingModule),
//     provideAnimations(),
//     { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }
//   ]
// }).catch(err => console.error(err));

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
