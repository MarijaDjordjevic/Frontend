import { NgModule } from '@angular/core';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { BoardComponent } from '../board/board.component';
import { LobbyComponent } from '../lobby/lobby.component';
import { ChallengeComponent } from '../challenge/challenge.component';
import { GameComponent } from '../game/game.component';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'board/:id',
    component: BoardComponent
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'challenge',
    component: ChallengeComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  imports: [
    // CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
