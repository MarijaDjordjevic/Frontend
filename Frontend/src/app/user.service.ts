import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Bearer' + localStorage.getItem('token'));
    return this.http.get(environment.serverUrl + 'users', {headers: header});
  }
}
