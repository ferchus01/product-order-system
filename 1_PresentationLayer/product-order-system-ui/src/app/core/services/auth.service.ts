import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:44394/api/user'; // Cambia a tu URL de backend

  constructor(private http: HttpClient) {}

  login(loginData: { email: string, password: string }): Observable<any> {
    // POST a /api/auth/login
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Método para checkear si estamos logueados
  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para cerrar sesión
  public logout(): void {
    localStorage.removeItem('token');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Decodifica el token para extraer role
    const payload = JSON.parse(atob(token.split('.')[1]));

    const userRole = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                     || payload['Role'];

    return userRole === '1';
  }

  getUserName(){
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Decodifica el token para extraer role
    const payload = JSON.parse(atob(token.split('.')[1]));

    const username = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                     || payload['Username'];

    return username;
  }

  isClient(): boolean {
    return this.isLoggedIn() && !this.isAdmin();
  }

}
