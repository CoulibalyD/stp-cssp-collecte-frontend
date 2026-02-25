import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormEntity } from '../../models/data.models';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './form-list-component.html',
  styleUrls: ['./form-list-component.scss']
})
export class FormListComponent {
  @Input() forms: FormEntity[] = [];

  getStatusClass(status: string): string {
    return status === 'PUBLISHED' ? 'badge-success' : 'badge-warning';
  }
}
