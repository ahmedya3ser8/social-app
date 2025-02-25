import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
    subscription: Subscription = new Subscription();
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required])
    }, {validators: this.confirmPassword})
  }
  submitRegisterForm(): void {
    if (this.registerForm.valid) {
      this.subscription = this.usersService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            this.router.navigateByUrl('/auth/login')
          }
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    } else {
      return {mismatch: true}
    }
  }
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get rePassword() {
    return this.registerForm.get('rePassword');
  }
  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
