import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  serverUrl!: string;
  private sharedData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private httpclient: HttpClient, private route: Router,) {
    this.serverUrl = 'http://localhost:8081';
   }

   public login(username: string, password: string) {
    const body = {
      username: username,
      password: password,
    };

    return this.httpclient.post(`${this.serverUrl}/api/auth/login`,body);
  }
  public tokenValidation(token: string) {
    return this.httpclient.post(`${this.serverUrl}/api/auth/TokenValidation`, {
      token,
    });
  }
  public logout(refresh_token: string) {
    const body = {
      refresh_token: refresh_token,
    };

    return this.httpclient.post(`${this.serverUrl}/api/auth/logout`, body);
  }
}
