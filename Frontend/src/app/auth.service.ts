import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from 'User';
import { Observable } from 'rxjs';
import { Router } from '../../node_modules/@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();

    if (token) {
      if (jwtHelper.isTokenExpired(token)) {
        localStorage.clear();
      }
      return !jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  login(email: string, password: string) {
    const header = new HttpHeaders();
    header.set('Accept', 'application/json');

    const fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);

    console.log('prijavljeno');
    return this.http.post(environment.serverUrl + 'users/login', fd, { headers: header });
  }

  register(name: string, email: string, password: string, password_confirmation: string): Observable<any> {
    const header = new HttpHeaders();
    header.set('Accept', 'application/json');

    const fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);
    fd.append('name', name);
    fd.append('password_confirmation', password_confirmation);

    console.log('registrovano');
    return this.http.post(environment.serverUrl + 'users/register', fd, { headers: header });
  }

  // authenticate(): Observable<boolean> {
  //   let header = new HttpHeaders();

  //   header = header.set('Authorization', localStorage.getItem('token'));
  //   return this.http.get(environment.serverUrl + 'users', {headers: header}).pipe(map((response) => {
  //     if (response['error']) {
  //       return false;
  //     }
  //     return true;
  //   }, error => {
  //     return false;
  //   }
  // }
}
