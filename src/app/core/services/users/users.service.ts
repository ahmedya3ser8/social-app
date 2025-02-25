import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../tokens/api-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly router = inject(Router);
  constructor(private httpClient: HttpClient) { }
  signUp(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/users/signup`, data);
  }
  signIn(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/users/signin`, data);
  }
  changePassword(data: any): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/users/change-password`, data);
  }
  updateProfilePhoto(data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/users/upload-photo`, data);
  }
  getLoggedInUser(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/users/profile-data`);
  }
  logout(): void {
    localStorage.removeItem('socialToken');
    this.router.navigateByUrl('/auth/login');
  }
}
