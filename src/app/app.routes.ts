import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { FormFillerComponent } from './components/form-filler-component/form-filler-component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'fill-form/:formId', component: FormFillerComponent },
  // Optionnel : redirection pour les routes inconnues
  // { path: '**', redirectTo: '' }
];
