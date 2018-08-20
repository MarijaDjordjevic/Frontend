import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: Boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }
}
