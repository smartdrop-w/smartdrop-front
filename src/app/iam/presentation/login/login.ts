import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../infrastructure/services/auth.service';
import { LanguageService } from '../../../shared/language/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  errorMessage = '';
  infoMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public language: LanguageService,
  ) {}

  onLogin() {
    this.errorMessage = '';
    this.infoMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingresa tu email y contraseña.';
      return;
    }
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.requires2FA) {
          if (res.simulatedCode) {
            this.infoMessage = 'Código 2FA simulado: ' + res.simulatedCode;
          }
          this.router.navigate(['/2fa-verify'], { queryParams: { email: this.email } });
        } else if (res) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Credenciales incorrectas o usuario no registrado.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error al comunicarse con el servidor. Por favor intenta de nuevo.';
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
