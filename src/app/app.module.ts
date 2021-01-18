import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TeamGuard } from './guards/team.guard';
import { PlayerInfoModule } from './shared/player-info/player-info.module';

@NgModule({
  declarations: [
    AppComponent
  ],
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
