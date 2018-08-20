import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client';
import { User } from 'User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  challenges: any = [];

  selectedUser: User;

  constructor(private userService: UserService, private gameService: GameService, private router: Router) { window.io = io; }

  ngOnInit() {
    const token = 'Bearer ' + localStorage.getItem('token');
    window.Echo = new Echo({
      broadcaster: 'socket.io',
      host: 'http://game-project.local:6001',
      auth:
      {
          headers:
          {
              'Authorization': token
          }
      }
    });

    window.Echo.join('lobby').here((users) => {
      users.forEach(element => {
        this.users.push(element);
      });
    }).joining((user) => {
      if (this.users.indexOf(user) === -1) {
        this.users.push(user);
      }
    }).leaving((user) => {
      this.users.splice(this.users.indexOf(user));
    });

    window.Echo.private('user.' + localStorage.getItem('userID')).listen('ChallengeEvent', (data) => {
      window.Echo.private('challenge.' + data['challenge_id']);
      console.log(data);
      if (this.challenges.filter(ch => (ch.challenger.id === data.challenger.id)).length === 0) {
        this.challenges.push(data);
        console.log(this.challenges);
      }
    });
    this.gameService.getGame().subscribe(data => {
      // console.log(data);
      // this.router.navigate(['/board']);
    }, (error: HttpErrorResponse) => {
    });

  }


  challenge() {
    // const user: User = this.selectedUser;
    console.log('Izazvao sam: ');
    console.log(this.selectedUser);
    this.gameService.createGame(this.selectedUser).subscribe(data => {
      console.log('game');
      console.log(data);
      window.Echo.private('challenge.' + data['pivot']['id']).listen('GameEvent', (data2) => {
        console.log('data2:');
        console.log(data2['game']['id']);
        this.router.navigate(['/board/' + data2['game']['id'] ]);
      });
    });
  }

  accept(challenge) {
    console.log(challenge.challenger['id']);
    this.gameService.acceptChallenge(challenge.challenger['id']).subscribe(data => {
      console.log('Accept');
      console.log(data);
      console.log('id: ' +  data['data']['id']);
      this.router.navigate(['/board/' + data['data']['id']]);
    });
  }

  cancel(challenge) {
    console.log('Cancel ' + challenge.challenger['id']);
    this.gameService.cancelChallenge(challenge.challenger['id']).subscribe(data => {
      console.log(data);
      this.router.navigate(['/users']);
    });
  }
}
