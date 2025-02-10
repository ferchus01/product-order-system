import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordVisible = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.querySelector('input[formControlName="password"]');
    if (passwordField) {
      passwordField.setAttribute('type', this.passwordVisible ? 'text' : 'password');
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    // Llamar al servicio de autenticación
    this.authService.login({ email, password })
      .subscribe({
        next: (res) => {
          // res puede incluir el token JWT
          console.log('Login exitoso:', res);

          // Guardar token en localStorage (o sessionStorage)
          localStorage.setItem('token', res.token);

          // Redireccionar a página protegida
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error en login:', err);
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Ocurrió un error en el login.';
          }
        }
      });
  }
}
