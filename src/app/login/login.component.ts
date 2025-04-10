import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent implements OnInit {
  
  @Output() switchToRegister = new EventEmitter<void>();
  @Output() loggedin = new EventEmitter<string>();
  @Output() exportLoggedIn = new EventEmitter<boolean>();
    
  date: Date = new Date("2025-08-14");
  Prova: string = "Este texto deberia estar en mayusculas";
  formularioLogin: FormGroup;
  authService = inject(AuthService);

  constructor(private form: FormBuilder) {
    this.formularioLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
    });
  }

  ngOnInit(): void {
    this.formularioLogin = this.form.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(8)]]
    });
  }

  showRegister() {
    this.switchToRegister.emit(); 
  }

  hasError(controlName: string, errorType: string) {
    return this.formularioLogin.get(controlName)?.hasError(errorType) && 
           this.formularioLogin.get(controlName)?.touched;  
  }

  login() {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const loginData = this.formularioLogin.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.exportLoggedIn.emit(true);
      },
      error: (error) => {
        console.error('Error en el login:', error);
        alert('Error en el login, verifica tus credenciales');
      }
    });
  }
}