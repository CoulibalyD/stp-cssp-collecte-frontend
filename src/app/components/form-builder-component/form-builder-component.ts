import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormEntity, FormField, Activite } from '../../models/data.models';
import { ActiviteService } from '../../services/activite-service';
import { FormService } from '../../services/form-service';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-builder-component.html',
  styleUrls: ['./form-builder-component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Output() formCreated = new EventEmitter<void>();

  activites: Activite[] = [];
  newForm: FormEntity = {
    title: '',
    description: '',
    status: 'PUBLISHED',
    activiteId: 0,
    fields: []
  };

  // Pour l'affichage conditionnel dans le template
  fieldTypes = [
    { value: 'TEXT', label: 'Texte (ligne)' },
    { value: 'TEXTAREA', label: 'Zone de texte' },
    { value: 'NUMBER', label: 'Nombre' },
    { value: 'DATE', label: 'Date' },
    { value: 'EMAIL', label: 'Email' },
    { value: 'TEL', label: 'Téléphone' },
    { value: 'DROPDOWN', label: 'Liste déroulante' },
    { value: 'RADIO', label: 'Boutons radio' },
    { value: 'CHECKBOX', label: 'Case à cocher' },
   ];

  constructor(
    private activiteService: ActiviteService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.loadActivites();
  }

  loadActivites(): void {
    this.activiteService.getAll().subscribe(data => this.activites = data);
  }

  addField(): void {
    this.newForm.fields.push({
      label: '',
      type: 'TEXT',
      isRequired: true,
      orderIndex: this.newForm.fields.length + 1,
      options: [],
      placeholder: '',
      min: undefined,
      max: undefined,
      step: undefined,
      rows: 4,
      accept: undefined,
      multiple: false
    });
  }

  removeField(index: number): void {
    this.newForm.fields.splice(index, 1);
  }

  addOption(field: FormField): void {
    if (!field.options) field.options = [];
    field.options.push({ label: '', value: '' });
  }

  removeOption(field: FormField, optIndex: number): void {
    field.options?.splice(optIndex, 1);
  }

  saveForm(): void {
    if (this.newForm.activiteId === 0) {
      alert('Veuillez sélectionner une activité !');
      return;
    }

    this.formService.create(this.newForm).subscribe({
      next: () => {
        alert('Formulaire créé avec succès !');
        this.newForm = {
          title: '',
          description: '',
          status: 'PUBLISHED',
          activiteId: 0,
          fields: []
        };
        this.formCreated.emit();
      },
      error: (err) => {
        console.error('Erreur lors de la création du formulaire', err);
        alert('Erreur: Vérifiez la console.');
      }
    });
  }
}
