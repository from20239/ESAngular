import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  @Output() backToLogin = new EventEmitter<void>();
  registroForm: FormGroup;
  registrationSuccess = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // 添加这个方法来解决错误
  hasError(controlName: string, errorType: string): boolean {
    const control = this.registroForm.get(controlName);
    return control ? control.hasError(errorType) && (control.dirty || control.touched) : false;
  }

  register() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }
  
    const userData = {
      name: this.registroForm.value.name,
      age: this.registroForm.value.age,
      email: this.registroForm.value.email,
      password: this.registroForm.value.password // 确保包含密码字段
    };
  
    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        this.registrationSuccess = true;
        setTimeout(() => this.backToLogin.emit(), 2000);
      },
      error: (error) => {
        console.error('Registration error:', error);
        // 显示更友好的错误信息
        const errorMsg = error.error?.message || 
                       error.error?.errors?.password?.message || 
                       'Registration failed. Please try again.';
        alert(errorMsg);
      }
    });
  }

  goBack() {
    this.backToLogin.emit();
  }
}