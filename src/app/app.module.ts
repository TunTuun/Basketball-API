import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app-routing.module';
import { PlayerInfoModule } from './shared/player-info/player-info.module';
import { AppComponent } from './app.component';
import { TeamGuard } from './guards/team.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PlayerInfoModule
  ],
  providers: [TeamGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
