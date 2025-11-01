import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

interface IData {
  user: string;
  iat: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  tokenData: WritableSignal<IData> = signal({} as IData);
  constructor() {
    this.saveData();
  }
  register(data: object): Observable<any> {
    return this.http.post(`https://linked-posts.routemisr.com/users/signup`, data);
  }
  login(data: object): Observable<any> {
    return this.http.post(`https://linked-posts.routemisr.com/users/signin`, data);
  }
  saveData(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: IData = jwtDecode(token);
      console.log(decoded);
      this.tokenData.set(decoded);
    } else {
      this.tokenData.set({} as IData);
    }
  }
}
