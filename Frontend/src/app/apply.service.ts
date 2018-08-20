import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  constructor(private http: HttpClient) { }

  apply() {
    const token = localStorage.getItem('token');
    const bearerHeader: string = 'Bearer ' + token;
    const header = new HttpHeaders().set('Authorization', bearerHeader);
    header.append('Accept', 'application/json');

    const url = environment.serverUrl + 'games/apply';
    console.log(url);
    const fd = new FormData();
    return this.http.put<any>(url, fd, {headers: header});
  }


}
