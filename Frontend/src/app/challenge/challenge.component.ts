import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from '../../../node_modules/rxjs';
import { User } from 'User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;

  constructor(private http: HttpClient) {
    this.getAppliedUsers().subscribe(res => {
      console.log(res['data']);
      this.users = res['data'];
    });
  }

  ngOnInit() {
  }

  getAppliedUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const bearerHeader: string = 'Bearer ' + token;

    const header = new HttpHeaders().set('Authorization', bearerHeader);
    header.append('Accept', 'application/json');

    const url = environment.serverUrl + 'users';

    return this.http.get<User[]>(url, { headers: header});
  }

  challenge() {
    console.log('Izabran id');
    console.log(this.selectedUser);

    const token = localStorage.getItem('token');
    const bearerHeader: string = 'Bearer ' + token;
    const header = new HttpHeaders().set('Authorization', bearerHeader);

    header.append('Accept', 'application/json');

    const url = environment.serverUrl + 'challenges/' + this.selectedUser;
    console.log(url);
    const fd = new FormData();
    return this.http.post<User[]>(url, fd, { headers: header});
  }
}
