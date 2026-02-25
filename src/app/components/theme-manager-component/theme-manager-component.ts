import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Theme } from '../../models/theme.model';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-theme-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-manager-component.html',
  styleUrls: ['./theme-manager-component.scss']
})
export class ThemeManagerComponent implements OnInit {
  @Output() themeChanged = new EventEmitter<void>();

  themes: Theme[] = [];
  newTheme: Theme = { title: '', description: '' };

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe(data => this.themes = data);
  }

  saveTheme(): void {
    if (!this.newTheme.title.trim()) return;
    this.themeService.createTheme(this.newTheme).subscribe(() => {
      this.newTheme = { title: '', description: '' };
      this.loadThemes();
      this.themeChanged.emit();
    });
  }

  deleteTheme(id: number): void {
    if (confirm('Supprimer ce thème ?')) {
      this.themeService.deleteTheme(id).subscribe(() => {
        this.loadThemes();
        this.themeChanged.emit();
      });
    }
  }
}
