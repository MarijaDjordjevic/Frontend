import { Component, OnInit } from '@angular/core';
import { User } from 'User';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  password: '';
  password_confirmation: '';

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
  }

  register() {
    this.auth.register(this.user.name, this.user.email, this.user.password, this.password_confirmation).subscribe(data => {
      localStorage.setItem('token', data['access_token']);
      this.router.navigate(['/lobby']);
    });
  }


  ngOnInit() {
  }

}
