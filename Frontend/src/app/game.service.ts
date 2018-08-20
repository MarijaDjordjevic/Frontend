import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { HttpRequest } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  createGame(id) {
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const fd = new FormData();
    return this.http.post(environment.serverUrl + 'challenges/' + id, fd, {headers: header});
  }

  playMove(take) {
    // let header = new HttpHeaders();
    // header = header.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // return this.http.get(environment.serverUrl + 'users', {headers: header});
  }
  enterGameRoom() {
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Bearer ' +  localStorage.getItem('token'));
    const fd = new FormData();
    return this.http.put(environment.serverUrl + 'games/apply', fd, {headers: header});
  }

  getGame() {
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(environment.serverUrl + 'users', {headers: header});
  }

  acceptChallenge(id) {
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const fd = new FormData();
    return this.http.post(environment.serverUrl + 'challenges/accept/' + id, fd,  {headers: header});
  }

  cancelChallenge(id) {
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const fd = new FormData();
    return this.http.post(environment.serverUrl + 'challenges/reject/' + id, fd,  {headers: header});
  }

  take(position, gameId) {
    console.log('Pozicija ' + position);
    console.log('Igra ' + gameId);
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const fd = new FormData();
    return this.http.post(environment.serverUrl + 'games/' + gameId + '/' + position, fd, {headers: header});
  }

}
