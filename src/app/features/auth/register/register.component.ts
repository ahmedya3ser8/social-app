import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RadioButton } from 'primeng/radiobutton';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [InputTextModule, FloatLabel, PasswordModule, DatePicker, RadioButton, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9@#$]{6,}$/)]],
      rePassword: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    }, { validators: [this.confirmPassword] })
  }
  formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate());
    const month = String(d.getMonth() + 1);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`; // 2025-10-28
  }
  confirmPassword(control: AbstractControl) {
    const fieldControl = control.get('password');
    const confirmFieldControl  = control.get('rePassword');
    if (fieldControl?.value === confirmFieldControl?.value) {
      return null;
    } else {
      confirmFieldControl?.setErrors({ mismatch: true  })
      return { mismatch: true };
    }
  }
  submitForm(): void {
    console.log(this.form);
    if (this.form.valid) {
      const formValue = { ...this.form.value };
      formValue.dateOfBirth = this.formatDate(formValue.dateOfBirth);
      console.log(formValue);
      this.authService.register(formValue).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.toastrService.success('Account created successfully! Glad to have you with us.')
            this.router.navigateByUrl('/auth/login');
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
  isFieldInvalid(field: string): boolean {
    const control: AbstractControl | null = this.form.get(field);
    return !!(control?.errors && control?.touched);
  }
}
