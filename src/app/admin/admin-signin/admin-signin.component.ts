import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnInit {

  adminSignInForm: FormGroup;
  errMsg: string;

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.adminSignInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }


  onAuth() {
    const email = this.adminSignInForm.get('email').value;
    const password = this.adminSignInForm.get('password').value;
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/admin', 'dashboard']);
      },
      error => {
        this.errMsg = error;
        alert(this.errMsg);
      }
    );
  }
}
