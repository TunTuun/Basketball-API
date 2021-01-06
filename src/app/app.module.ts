import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamsComponent } from './Components/teams/teams.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { FavoriteComponent } from './Components/favorite/favorite.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './Error/error.component';
import { PlayersModule } from './Components/players/players.module';
import { MatDialogModule } from '@angular/material/dialog';

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
    PlayersModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
