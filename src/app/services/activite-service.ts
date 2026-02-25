import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Activite } from '../models/data.models';

@Injectable({ providedIn: 'root' })
export class ActiviteService {
  private readonly url = `${environment.apiUrl}/activites`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.url);
  }

  getById(id: number): Observable<Activite> {
    return this.http.get<Activite>(`${this.url}/${id}`);
  }

  getByTheme(themeId: number): Observable<Activite[]> {
    return this.http.get<Activite[]>(`${this.url}/theme/${themeId}`);
  }

  create(data: Activite): Observable<Activite> {
    return this.http.post<Activite>(this.url, data);
  }

  update(id: number, data: Activite): Observable<Activite> {
    return this.http.put<Activite>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}


