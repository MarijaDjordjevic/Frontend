import { Component, OnInit } from '@angular/core';
import { User } from 'User';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
  }

  login() {
    this.auth.login(this.email, this.password).subscribe(data => {
      localStorage.setItem('token', data['access_token']);
      localStorage.setItem('userID', data['data']['id']);
      this.router.navigate(['/lobby']);
    });
  }

  ngOnInit() {
  }

}
