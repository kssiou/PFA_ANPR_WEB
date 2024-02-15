import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "../service/auth.service";

@Component({
  selector: 'app-login-controller',
  template:
    '<app-login  [message_error]="message_error" (loginEvent)="login($event)"></app-login>',
})
export class LoginControllerComponent {
  message_error!: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  login(event: any) {
    this.authenticationService.login(event.email, event.password).subscribe(
      (response: any) => {

       localStorage.setItem("access_token",response.access_token);
       localStorage.setItem("refresh_token",response.refresh_token);
        this.router.navigate(['/home']);

      },
      (error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
            this.message_error = 'Invalid_credentials';
        }
      }
    );

  }

}