import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }
  get formControls() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.tokenService.login(username, password).subscribe(
      (response: any) => {
        this.tokenService.updateLoginStatus(true);
        localStorage.setItem('token', response.token); // Store token in local storage
        this.router.navigate(['/info']); // Redirect to info page upon successful login
      },
      error => {
        this.error = error.error.message; // Display error message
      }
    );
  }
}