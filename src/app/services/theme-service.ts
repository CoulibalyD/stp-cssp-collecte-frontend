import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Theme} from '../models/theme.model';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly url = `${environment.apiUrl}/themes`;

  constructor(private http: HttpClient) {}

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.url);
  }

  getThemeById(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.url}/${id}`);
  }

  searchThemes(keyword: string): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.url}/search`, { params: { keyword } });
  }

  createTheme(theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(this.url, theme);
  }

  updateTheme(id: number, theme: Theme): Observable<Theme> {
    return this.http.put<Theme>(`${this.url}/${id}`, theme);
  }

  deleteTheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}


