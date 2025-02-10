import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormField, MatCardModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
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
    if (this.registerForm.invalid) return;

    const { firstName, lastName, username, email, password } = this.registerForm.value;
    // Si quieres, validas que password === confirmPassword antes de enviar.

    this.authService.register({ firstName, lastName, username, email, password })
      .subscribe({
        next: (res) => {
          // Maneja respuesta exitosa, redirección, etc.
          console.log('Registro exitoso:', res);
        },
        error: (err) => {
          // Maneja error, mostrar mensaje al usuario, etc.
          console.error('Error en registro:', err);
        }
      });
  }
}
