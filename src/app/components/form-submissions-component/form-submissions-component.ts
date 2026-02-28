import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {SubmissionListComponent} from '../submission-list-component/submission-list-component';

@Component({
  selector: 'app-form-submissions',
  standalone: true,
  imports: [CommonModule, RouterModule, SubmissionListComponent],
  template: `
    <div class="container mt-4">
      <h2>Soumissions du formulaire</h2>
      <app-submission-list [formId]="formId"></app-submission-list>
      <a routerLink="/" class="btn btn-secondary mt-3">Retour</a>
    </div>
  `,
  styles: []
})
export class FormSubmissionsComponent implements OnInit {
  formId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.formId = +this.route.snapshot.paramMap.get('formId')!;
  }
}
