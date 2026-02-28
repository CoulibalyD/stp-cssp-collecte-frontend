import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubmissionService } from '../../services/submission-service';
import { FormSubmissionResponse } from '../../models/data.models';

@Component({
  selector: 'app-submission-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './submission-list-component.html',
  styleUrls: ['./submission-list-component.scss']
})
export class SubmissionListComponent implements OnInit {
  @Input() formId!: number;
  submissions: FormSubmissionResponse[] = [];
  loading = false;
  error: string | null = null;

  constructor(private submissionService: SubmissionService) {}

  ngOnInit(): void {
    if (this.formId) {
      this.loadSubmissions();
    }
  }

  loadSubmissions(): void {
    this.loading = true;
    this.submissionService.getSubmissionsByFormId(this.formId).subscribe({
      next: (data) => {
        this.submissions = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des soumissions.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
