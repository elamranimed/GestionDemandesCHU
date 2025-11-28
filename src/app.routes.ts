import { Routes } from '@angular/router';
import { authGuard, adminGuard, responsableGuard } from './app/guards/auth.guard';
import { DashboardLayoutComponent } from './app/layout/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  // Page de connexion (accessible sans authentification)
  {
    path: 'login',
    loadComponent: () =>
      import('./app/pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'admin',
    component: DashboardLayoutComponent,
    canActivate: [authGuard, adminGuard],
    canActivateChild: [authGuard, adminGuard],
    children: [
      { path: '', redirectTo: 'toutes-demandes', pathMatch: 'full' },
      {
        path: 'toutes-demandes',
        loadComponent: () =>
          import('./app/pages/toutes-demandes/toutes-demandes.component')
            .then(m => m.ToutesDemandesComponent)
      },
      {
        path: 'liste-personnel',
        loadComponent: () =>
          import('./app/pages/liste-personnel/liste-personnel.component')
            .then(m => m.ListePersonnelComponent)
      }
    ]
  },
  {
    path: 'responsable',
    component: DashboardLayoutComponent,
    canActivate: [authGuard, responsableGuard],
    canActivateChild: [authGuard, responsableGuard],
    children: [
      { path: '', redirectTo: 'mes-demandes', pathMatch: 'full' },
      {
        path: 'mes-demandes',
        loadComponent: () =>
          import('./app/pages/mes-demandes/mes-demandes.component')
            .then(m => m.MesDemandesComponent)
      },
      {
        path: 'personnels',
        loadComponent: () =>
          import('./app/pages/personnels-responsable/personnels-responsable.component')
            .then(m => m.PersonnelsResponsableComponent)
      },
      {
        path: 'creer-demande',
        loadComponent: () =>
          import('./app/pages/creer-nouvelle-demande/creer-nouvelle-demande.component')
            .then(m => m.CreerNouvelleDemandeComponent)
      }
    ]
  },

  // Redirections par défaut
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
