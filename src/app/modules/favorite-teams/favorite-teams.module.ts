import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoriteTeamsComponent } from './favorite-teams.component';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { FavoriteTeamsRoutingModule } from './favorite-teams-routing.module';

@NgModule({
  declarations: [
    FavoriteTeamsComponent
  ],
  imports: [
    CommonModule,
    FavoriteTeamsRoutingModule,
    SpinnerModule
  ],
  providers: [
    
  ]
})

export class FavoriteTeamsModule {}
