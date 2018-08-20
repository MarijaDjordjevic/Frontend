import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from 'User';
import { StartPlayTheGameService } from '../start-play-the-game.service';
import { GameService } from '../game.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  values: number[] = [0, 1, 2];
  srcImages: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  m: string[] = ['blank.png' , 'blank.png', 'blank.png', 'blank.png', 'blank.png', 'blank.png',
  'blank.png', 'blank.png', 'blank.png', 'blank.png'];
  player: number;
  gameOver: boolean;
  users: User[] = [];
  selectedUser: User;
  gameCreatedSucc: boolean;
  win = false;
  lost = false;
  draw = false;

  gameId: any;

  constructor(private http: HttpClient, private startPlayService: StartPlayTheGameService,
    private gameService: GameService, private route: ActivatedRoute, private router: Router) {
      window.io = io;
    }


  clicked(vred) {
    console.log(vred);
    this.gameService.take(vred, this.gameId).subscribe(data => {
      // console.log('clicked');
      // console.log(data);
      // console.log('pozicija');
      // console.log(data['data']['position']);
      // console.log('igrac');
      // console.log(data['data']['field_type']);
      const poz = data['data']['position'];
      this.srcImages[poz] = 1;
      this.m[poz] = data['data']['field_type'] + '.png';
    });
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
    console.log();

    this.route.params.subscribe(param => {
      if (param['id']) {
        this.gameId = param['id'];
        console.log(this.gameId);
        window.Echo.private('game.' + this.gameId).listen('MoveEvent', data => {
          // console.log('move-poz:');
          // console.log(data);
          // console.log(data['move']['position']);
          // console.log(data['move']['field_type']);
          const poz = data['move']['position'];
          this.srcImages[poz] = 1;
          this.m[poz] = data['move']['field_type'] + '.png';
        }).listen('GameOverEvent', data => {
          const myId = localStorage.getItem('userID');
          console.log('my id:');
          console.log(myId);
          if (data['game']['winner'] != null) {
            // tslint:disable-next-line:triple-equals
            if (data['game']['winner'] == myId ) {
              console.log('You won');
              this.win = true;
            } else {
              console.log('You lost');
              this.lost = true;
            }
          } else {
            if (data['game']['draw'] !== 0) {
              console.log('Draw');
              this.draw = true;
            }
          }
          console.log(data);
        });
      }
    });
    /*
    this.gameService.getGame().subscribe(data => {
      // console.log(data);
      // this.router.navigate(['/board']);
    }, (error: HttpErrorResponse) => {
    });*/

    // this.player = 1;
    // this.gameOver = false;
    // for (let i = 0; i < 3; i++) {
    //   for (let j = 0; j < 3; j++) {
    //       this.srcImages[i][j] = 0;
    //       this.m[i][j] = 'blank.png';
    //   }
    // }

    // this.getAllUsers().subscribe(odgovor => {
    //   console.log(odgovor['data']);
    //   this.users = odgovor['data'];
    //   // console.log(this.users);
    // });

    // this.gameCreatedSucc = false;
  }

  // clicked(x: number, y: number): void {
  //   if (this.srcImages[x][y] === 0) {
  //     if (this.player === 1) {
  //       this.srcImages[x][y] = 1;
  //       this.m[x][y] = 'x.png';
  //       this.player = 0;
  //     } else {
  //       this.srcImages[x][y] = 2;
  //       this.player = 1;
  //       this.m[x][y] = 'o.png';
  //     }
  //   }
  //   this.checkStateOfTheMatrix();
  // }

  // getAllUsers(): Observable<User[]> {
  //   const bearerHeader: string = 'Bearer ' + localStorage.getItem('token');

  // //   const headers = new HttpHeaders().set('Authorization', bearerHeader);
  // //   const url = environment.serverUrl + 'users';
  // //   console.log(url);
  // //   const formData = new FormData();
  // //   // formData.append('username', "");
  // //   return this.http.get<User[]>(url);
  // // }

  // checkStateOfTheMatrix(): void {
  //   for (let i = 0; i < 3; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       if (this.srcImages[i][j] === 0) {
  //         return;
  //       }
  //     }
  //   }

  //   this.gameOver = true;
  // }

  // startTheGame(): void
  // {
  //   console.log("usao")
  //   console.log(this.selectedUser)
  //   this.startPlayService.startTheGame(this.selectedUser.id).subscribe(odgovor =>
  //   {
  //     console.log(odgovor);
  //     if (odgovor != undefined) {
  //       console.log("dobro je"); this.gameCreatedSucc = true; }
  //     else {
  //       console.log("nije dobro"); this.gameCreatedSucc = false; }
  //   });
  // }
}
