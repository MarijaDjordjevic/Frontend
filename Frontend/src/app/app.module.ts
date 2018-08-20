import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { HeaderComponent } from './header/header.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { GameComponent } from './game/game.component';
import { UsersComponent } from './users/users.component';
import { GameService } from './game.service';
import { UserService } from './user.service';

declare global {
  interface Window { io: any; }
  interface Window { Echo: any; }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthPageComponent,
    HomeComponent,
    BoardComponent,
    HeaderComponent,
    LobbyComponent,
    ChallengeComponent,
    GameComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
