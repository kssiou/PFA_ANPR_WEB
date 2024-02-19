import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthenticationService} from "../service/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  serverUrl: string;

  constructor(
    private authenticationService: AuthenticationService,  private route: Router ,private http: HttpClient) {
    this.serverUrl = 'http://localhost:3000/api/auth/isAuthenticated';
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean> {

    const accesstoken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");


    if (state.url.includes('/auth/login')) {
      if (refreshToken) {
        this.authenticationService.tokenValidation(refreshToken).subscribe({
          next: (data:any) => {
            if (data === false) {
              return true;
            } else {
              this.route.navigate(['/']);
              return false;
            }
          },
          error: (e:any) => {
            return true;
          },
        });
      }

      return true;
    }
    if (!refreshToken && !accesstoken) {
      this.route.navigate(['/login']);
    }



    this.isAuthenticated().pipe(
      switchMap((data: any) => {
        return data.isAuthenticated;
      }),
      catchError(() => {
        return of(false);
      })
    );

    return true;
  }

  public isAuthenticated(): Observable<{ isAuthenticated: boolean }> {
    return this.http.get<{ isAuthenticated: boolean }>(
      this.serverUrl,
      httpOptions
    );
  }
}

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
};
