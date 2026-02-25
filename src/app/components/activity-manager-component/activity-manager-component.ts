import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Activite } from '../../models/data.models';
import { Theme } from '../../models/theme.model';
import { ActiviteService } from '../../services/activite-service';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-activity-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-manager-component.html',
  styleUrls: ['./activity-manager-component.scss']
})
export class ActivityManagerComponent implements OnInit {
  @Output() activityChanged = new EventEmitter<void>();

  activites: Activite[] = [];
  themes: Theme[] = [];
  newActivite: Activite = {
    title: '',
    description: '',
    activiteDate: '',
    themeId: 0
  };

  constructor(
    private activiteService: ActiviteService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadThemes();
    this.loadActivites();
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe(data => this.themes = data);
  }

  loadActivites(): void {
    this.activiteService.getAll().subscribe(data => this.activites = data);
  }

  saveActivite(): void {
    if (!this.newActivite.title.trim() || this.newActivite.themeId === 0) {
      alert('Veuillez remplir le titre et choisir un thème.');
      return;
    }

    // Format date : ajouter T00:00:00 si nécessaire
    const payload = { ...this.newActivite };
    if (payload.activiteDate) {
      payload.activiteDate = payload.activiteDate + 'T00:00:00';
    }

    this.activiteService.create(payload).subscribe({
      next: () => {
        this.newActivite = { title: '', description: '', activiteDate: '', themeId: 0 };
        this.loadActivites();
        this.activityChanged.emit();
      },
      error: (err) => console.error(err)
    });
  }

  deleteActivite(id: number): void {
    if (confirm('Supprimer cette activité ?')) {
      this.activiteService.delete(id).subscribe(() => {
        this.loadActivites();
        this.activityChanged.emit();
      });
    }
  }

  getThemeName(themeId: number): string {
    const theme = this.themes.find(t => t.id === themeId);
    return theme ? theme.title : 'Inconnu';
  }
}
