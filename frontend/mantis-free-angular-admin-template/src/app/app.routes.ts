import { Routes } from '@angular/router';

import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { Configuracion } from './configuracion/configuracion';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  // Redirigir ruta raíz a login
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },

  // =============================
  // ADMIN LAYOUT
  // =============================
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard/default',
        loadComponent: () =>
          import('./demo/dashboard/default/default.component').then(
            (c) => c.DefaultComponent
          ),
          canActivate: [AuthGuard]
      },
      {
        path: 'tipoCatalogo',
        loadComponent: () =>
          import('./configuracion/tipo-catalogo/tipo-catalogo').then(c => c.TipoCatalogo),
        canActivate: [AuthGuard]
      },
      {
        path: 'catalogo',
        loadComponent: () =>
          import('./configuracion/catalogo/catalogo').then(
            (c) => c.Catalogo
          )
      },

      // resto de rutas de admin
    ]
  },

  // =============================
  // GUEST LAYOUT
  // =============================
  {
    path: 'auth',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-login/auth-login.component').then(
            (c) => c.AuthLoginComponent
          )
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-register/auth-register.component').then(
            (c) => c.AuthRegisterComponent
          )
      }
    ]
  },

  // =============================
  // CONFIG LAYOUT
  // =============================
  {
    path: 'config',
    component: Configuracion,
    children: [
      {
        path: 'tipoCatalogo',
        loadComponent: () =>
          import('./configuracion/tipo-catalogo/tipo-catalogo').then(
            (c) => c.TipoCatalogo
          ),
        canActivate: [AuthGuard]
      }
    ]
  },

  // Opcional: página 404 si no encuentra ruta
  { path: '**', redirectTo: '/auth/login' }
];


// export const routes: Routes = [
//   // =============================
//   // ADMIN LAYOUT
//   // =============================
//   {
//     path: '',
//     component: AdminComponent,
//     children: [
//       {
//         path: '',
//         redirectTo: '/dashboard/default',
//         pathMatch: 'full'
//       },
//       {
//         path: 'dashboard/default',
//         loadComponent: () =>
//           import('./demo/dashboard/default/default.component').then(
//             (c) => c.DefaultComponent
//           )
//       },
//       {
//         path: 'typography',
//         loadComponent: () =>
//           import('./demo/component/basic-component/typography/typography.component').then(
//             (c) => c.TypographyComponent
//           )
//       },
//       {
//         path: 'color',
//         loadComponent: () =>
//           import('./demo/component/basic-component/color/color.component').then(
//             (c) => c.ColorComponent
//           )
//       },
//       {
//         path: 'sample-page',
//         loadComponent: () =>
//           import('./demo/others/sample-page/sample-page.component').then(
//             (c) => c.SamplePageComponent
//           )
//       },
//       {
//         path: 'tipoCatalogo',
//         loadComponent: () =>
//           import('./configuracion/tipo-catalogo/tipo-catalogo').then(c => c.TipoCatalogo),
//         canActivate: [AuthGuard]
//       },
//       {
//         path: 'catalogo',
//         loadComponent: () =>
//           import('./configuracion/catalogo/catalogo').then(
//             (c) => c.Catalogo
//           )
//       },
//     ]
//   },

//   // =============================
//   // GUEST LAYOUT
//   // =============================
//   {
//     path: 'auth',
//     component: GuestLayoutComponent,
//     children: [
//       {
//         path: 'login',
//         loadComponent: () =>
//           import('./demo/pages/authentication/auth-login/auth-login.component').then(
//             (c) => c.AuthLoginComponent
//           )
//       },
//       {
//         path: 'register',
//         loadComponent: () =>
//           import('./demo/pages/authentication/auth-register/auth-register.component').then(
//             (c) => c.AuthRegisterComponent
//           )
//       }
//     ]
//   },

//   // =============================
//   // CONFIG LAYOUT
//   // =============================
//   {
//     path: 'config',
//     component: Configuracion,
//     children: [
//       {
//         path: 'tipoCatalogo',
//         loadComponent: () =>
//           import('./configuracion/tipo-catalogo/tipo-catalogo').then(
//             (c) => c.TipoCatalogo
//           )
//       }
//     ]
//   }
// ];
