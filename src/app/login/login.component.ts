import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

/**
 * Login component with a login/password input.
 * 
 * Checks login info using `AuthenticationService`.
 * 
 * Reads route snapshot to redirect after a successful login.
 */
@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;
  button = {
    text: 'Login',
    color: 'primary'
  };
  username: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // Reset login status
    this.authenticationService.logout();

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  alertButton(text: string, color: string) {
    this.button = { text, color };
    setTimeout(() => {
      this.button.text = 'Login';
      this.button.color = 'primary';
    }, 2000)
  }

  submit() {
    // CHECK
    if (this.username.length < 3 && this.password.length < 3) { return }

    this.loading = true;
    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          // Login successful
          this.alertButton('Success!', 'accent')
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 1000)
        },
        error => {
          this.alertButton('Invalid credentials', 'warn');
          this.loading = false;
        });
  }
}