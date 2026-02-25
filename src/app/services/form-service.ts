import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormEntity } from '../models/data.models';

@Injectable({ providedIn: 'root' })
export class FormService {
  private readonly url = `${environment.apiUrl}/forms`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<FormEntity[]> {
    return this.http.get<FormEntity[]>(this.url);
  }

  getById(id: number): Observable<FormEntity> {
    return this.http.get<FormEntity>(`${this.url}/${id}`);
  }

  getByActivite(activiteId: number): Observable<FormEntity> {
    return this.http.get<FormEntity>(`${this.url}/activite/${activiteId}`);
  }

  create(data: FormEntity): Observable<FormEntity> {
    return this.http.post<FormEntity>(this.url, data);
  }

  update(id: number, data: FormEntity): Observable<FormEntity> {
    return this.http.put<FormEntity>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}


