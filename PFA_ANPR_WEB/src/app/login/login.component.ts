import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnChanges , OnInit{
  @Input() message_error!: string;
  @Output() loginEvent = new EventEmitter();
  myForm!: FormGroup;
  isLoading: boolean = false;
  loginError!: string;
  constructor(
    // private translate: TranslateService,
    private fb: FormBuilder,
    private router: Router, ){
    this.createForm();
  }

  ngOnChanges(): void {
    this.initData();
  }



  ngOnInit(): void {
    this.createForm();
    this.clearFieldErrors();
  }

  createForm() {
    const rememberMeValue = localStorage.getItem('rememberMe') === 'on';

    this.myForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      rememberMe: [rememberMeValue],
    });
  }

  clearFieldErrors() {
    this.myForm.controls['email'].valueChanges
      .pipe(tap(() => (this.loginError = '')))
      .subscribe();
    this.myForm.controls['password'].valueChanges
      .pipe(tap(() => (this.loginError = '')))
      .subscribe();
    this.myForm.controls['rememberMe'].valueChanges
      .pipe(tap(() => (this.loginError = '')))
      .subscribe();
  }

  login() {
    console.log("form value:", this.myForm.value);

    if(this.myForm.valid) {
      this.isLoading = true;

      const rememberMeValue = this.myForm.get('rememberMe')?.value;
      const rememberMeString = rememberMeValue ? 'on' : 'off';

      if (rememberMeValue) {
        localStorage.setItem('rememberMe', rememberMeString);
      } else {
        localStorage.removeItem('rememberMe');
      }

    this.loginEvent.emit(this.myForm.value);
    }
    }


    initData() {
      if (this.message_error === 'Invalid_credentials') {
        this.isLoading = false;
        this.loginError = 'Invalid credentials. Please verify your information';
      }
    }

}
