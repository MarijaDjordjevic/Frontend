import { Component, OnInit } from '@angular/core';
import { ApplyService } from '../apply.service';
import { HttpClient} from '../../../node_modules/@angular/common/http';
import { Router } from '../../../node_modules/@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {


  constructor(private a: ApplyService, private http: HttpClient, private router: Router, private gameService: GameService) { }

  ngOnInit() {
  }

  apply() {
    // this.a.apply().subscribe(res => {
    //   console.log('Applied');
    //   this.router.navigate(['/users']);
    // });
    this.gameService.enterGameRoom().subscribe(data => {
      console.log('Applied');
      this.router.navigate(['/users']);
    });
  }

}
