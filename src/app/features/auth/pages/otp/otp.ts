import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { ApiService } from '../../../../core/services/api.service';
import { endpoints } from '../../../../core/constant/api.endpoint';
import { Iverify2fa } from '../../../../core/models/authApiresponse';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputOtpModule],
  templateUrl: './otp.html',
  styleUrl: './otp.scss'
})
export class Otp implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');
  

  private state = window.history.state;

  otpForm = new FormGroup({
    deviceId: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  ngOnInit() {
    if (!this.state || !this.state.email || !this.state.password) {
      this.router.navigate(['/auth/login']);
    }
  }

  get f() {
    return this.otpForm.controls;
  }

  onVerify() {
    if (this.otpForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      
      const payload = {
        email: this.state.email,
        password: this.state.password,
        token: this.otpForm.getRawValue().deviceId
      };

      this.api.post<Iverify2fa>(endpoints.auth.verify2fa, payload).subscribe({
        next: (response: Iverify2fa) => {
             if(response.status===200 && response.data.tokenDto.accessToken) {
              
              localStorage.setItem('accessToken', response.data.tokenDto.accessToken);
              this.router.navigate(['/']);
            }else if(!response.success) {
              this.errorMessage.set(response.message);
            }
        },
        error: (err) => {
          this.errorMessage.set('Invalid code. Please try again.');
          this.isLoading.set(false);
        },
        complete: () => this.isLoading.set(false)
      });
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
}