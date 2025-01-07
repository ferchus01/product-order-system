import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];
