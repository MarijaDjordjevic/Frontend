import { Component, OnInit } from '@angular/core';
import { User } from 'User';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Echo } from 'laravel-echo';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  values: number[] = [0, 1, 2];
  srcImages: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  m: string[] = ['blank.png' , 'blank.png', 'blank.png', 'blank.png', 'blank.png', 'blank.png', 'blank.png', 'blank.png'];
  player: number;
  gameOver: boolean;
  users: User[] = [];
  selectedUser: User;
  gameCreatedSucc: boolean;


  private cells: string[] = [];
  private turn = 'x';
  private gameover = false;
  private winner = null;

  gameId: any;

  constructor(private router: Router, private gameService: GameService, private route: ActivatedRoute) {
    window.io = io;
  }

  clicked(vred) {
    console.log(vred);
  }

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

    this.route.params.subscribe(param => {
      if (param['id']) {
        this.gameId = param['id'];

        window.Echo.private('game.' + this.gameId).listen('MoveEvent', data => {
          console.log(data);
          // if (this.cells[data['take']['position'] - 1] === null) {
          //   this.cells[data['take']['position'] - 1] = data['take']['symbol'];
          // }
        }).listen('GameOverEvent', data => {
          console.log(data, 'game over');
        });
      }
    });

    for (let i = 0; i < 9; i++) {
      this.cells[i] = null;
    }
  }
  init() {
    for (let i = 0; i < 9; i++) {
      this.cells[i] = null;
    }
  }
  clickHandler(position) {
/*
    this.gameService.take(position, this.gameId).subscribe(data => {
      console.log(data, 'response');
      // if (this.cells[data['data']['position']-1] === null) {
      //        this.cells[data['data']['position']-1] = data['data']['symbol'];
      // }
    });*/
  }
}

