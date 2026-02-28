import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { FormFillerComponent } from './components/form-filler-component/form-filler-component';
import {SubmissionDetailComponent} from './components/submission-detail-component/submission-detail-component';
import {FormSubmissionsComponent} from './components/form-submissions-component/form-submissions-component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'fill-form/:formId', component: FormFillerComponent },
  { path: 'submission/:id', component: SubmissionDetailComponent },
  { path: 'form/:formId/submissions', component: FormSubmissionsComponent }
];
