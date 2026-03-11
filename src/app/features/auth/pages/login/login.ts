import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ApiService } from '../../../../core/services/api.service';
import { endpoints } from '../../../../core/constant/api.endpoint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    CardModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  
  isLoading = signal(false);
  errorMessage = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    rememberMe: new FormControl(false),
  });

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.api.post(endpoints.auth.login, this.loginForm.getRawValue()).subscribe({
        next: (response: any) => {
          if(response.status === 200) {
            this.router.navigate(['/auth/otp'],{
              state:this.loginForm.getRawValue()
            });
            return;
          } else if(response.status===400){
            this.errorMessage.set(response.message || 'Login failed. Please check your credentials and try again.');
            return;
          }
          console.log('Login successful:', response.status);
        },
        error: (error) => {
          this.errorMessage.set('Login failed. Please check your credentials and try again.');
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
