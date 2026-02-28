import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormSubmission, FormSubmissionResponse } from '../models/data.models';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private url = `${environment.apiUrl}/submissions`;

  constructor(private http: HttpClient) {}

  submit(data: FormSubmission): Observable<any> {
    return this.http.post(this.url, data);
  }

  getSubmissionsByFormId(formId: number): Observable<FormSubmissionResponse[]> {
    return this.http.get<FormSubmissionResponse[]>(`${this.url}/form/${formId}`);
  }

  getSubmissionById(id: number): Observable<FormSubmissionResponse> {
    return this.http.get<FormSubmissionResponse>(`${this.url}/${id}`);
  }

  getSubmissionsBySubmitter(submitterId: string): Observable<FormSubmissionResponse[]> {
    return this.http.get<FormSubmissionResponse[]>(`${this.url}/submitter/${submitterId}`);
  }
}
