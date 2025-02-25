import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  signInForm!: FormGroup;
  subscription: Subscription = new Subscription();
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    })
  }
  submitSignInForm(): void {
    if (this.signInForm.valid) {
      this.subscription = this.usersService.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            localStorage.setItem('socialToken', res.token);
            this.router.navigateByUrl('/timeline')
          }
        }
      })
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
