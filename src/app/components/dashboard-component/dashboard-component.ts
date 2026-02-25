import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEntity } from '../../models/data.models';
import { FormService } from '../../services/form-service';
import {ThemeManagerComponent} from '../theme-manager-component/theme-manager-component';
import {ActivityManagerComponent} from '../activity-manager-component/activity-manager-component';
import {FormBuilderComponent} from '../form-builder-component/form-builder-component';
import {FormListComponent} from '../form-list-component/form-list-component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ThemeManagerComponent,
    ActivityManagerComponent,
    FormBuilderComponent,
    FormListComponent
  ],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss']
})
export class DashboardComponent implements OnInit {
  forms: FormEntity[] = [];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(): void {
    this.formService.getAll().subscribe({
      next: (data) => (this.forms = data),
      error: (err) => console.error('Erreur chargement formulaires', err)
    });
  }

  onFormCreated(): void {
    this.loadForms();
  }

  onThemeOrActivityChanged(): void {
    // Si nécessaire, on peut rafraîchir d'autres données (par exemple, les activités liées)
    // Pour l'instant, on ne fait rien car la liste des formulaires n'est pas impactée directement
    console.log('Thème ou activité modifié');
  }
}
