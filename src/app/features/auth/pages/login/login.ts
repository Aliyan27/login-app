import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

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
    CardModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  isLoading = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true
    }),
    rememberMe: new FormControl(false)
  });


  get f() { return this.loginForm.controls; }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      console.log('Logging in with:', this.loginForm.getRawValue());
      setTimeout(() => this.isLoading.set(false), 2000);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}