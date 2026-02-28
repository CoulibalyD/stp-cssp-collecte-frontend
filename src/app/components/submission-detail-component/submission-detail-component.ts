import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubmissionService } from '../../services/submission-service';
import { FormSubmissionResponse } from '../../models/data.models';

@Component({
  selector: 'app-submission-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './submission-detail-component.html',
  styleUrls: ['./submission-detail-component.scss']
})
export class SubmissionDetailComponent implements OnInit {
  submission?: FormSubmissionResponse;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSubmission(+id);
    }
  }

  loadSubmission(id: number): void {
    this.loading = true;
    this.submissionService.getSubmissionById(id).subscribe({
      next: (data) => {
        console.log("===========> ", data)
        this.submission = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de la soumission.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
