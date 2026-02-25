import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormEntity, FormSubmission } from '../../models/data.models';
import { SubmissionService } from '../../services/submission-service';
import { FormService } from '../../services/form-service';
import { DynamicFieldComponent } from '../dynamic-field-component/dynamic-field-component';

@Component({
  selector: 'app-form-filler',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicFieldComponent],
  templateUrl: './form-filler-component.html',
  styleUrls: ['./form-filler-component.scss']
})
export class FormFillerComponent implements OnInit {
  formStructure?: FormEntity;
  userResponses: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('formId');
    if (formId) {
      this.loadForm(+formId);
    }
  }

  loadForm(id: number): void {
    this.formService.getById(id).subscribe({
      next: (form) => {
        this.formStructure = form;
        // Initialiser les réponses vides
        form.fields.forEach(field => {
          if (field.id) this.userResponses[field.id] = '';
        });
      },
      error: (err) => console.error('Erreur chargement formulaire', err)
    });
  }

  submitForm(): void {
    if (!this.formStructure) return;
    const submission: FormSubmission = {
      formId: this.formStructure.id!,
      submitterId: 'agent_test_001', // À remplacer par l'utilisateur connecté
      responses: Object.keys(this.userResponses).map(key => ({
        fieldId: parseInt(key),
        value: this.userResponses[parseInt(key)]
      }))
    };

    this.submissionService.submit(submission).subscribe({
      next: () => alert('Données envoyées avec succès !'),
      error: (err) => console.error(err)
    });
  }
}
