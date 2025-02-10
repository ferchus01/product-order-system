import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userName: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.userName = this.authService.getUserName();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  onSearch(term: string): void {
    console.log('Buscar:', term);
  }

  clearSearch(): void {
    console.log('Clear search');
  }

  goProfile(): void {
    // Navegar a la página de perfil
    this.router.navigate(['/profile']);
  }

  onLogout(): void {
    // Lógica de logout
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}


