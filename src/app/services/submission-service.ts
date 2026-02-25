import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FormSubmission} from '../models/data.models';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private url = `${environment.apiUrl}/submissions`;
  constructor(private http: HttpClient) {}

  submit(data: FormSubmission): Observable<any> {
    return this.http.post(this.url, data);
  }
}


