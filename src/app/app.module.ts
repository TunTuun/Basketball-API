import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamsComponent } from './teams/teams.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { FavoriteComponent } from './favorite/favorite.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { PlayersComponent } from './players/players.component';
import { PlayersModule } from './players/players.module';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    FavoriteComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PlayersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
