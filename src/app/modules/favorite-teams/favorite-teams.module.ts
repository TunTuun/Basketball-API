import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { FavoriteTeamsRoutingModule } from './favorite-teams-routing.module';
import { FavoriteTeamsComponent } from './favorite-teams.component';

@NgModule({
  declarations: [FavoriteTeamsComponent],
  imports: [
    CommonModule,
    FavoriteTeamsRoutingModule,
    SpinnerModule
  ]
})

export class FavoriteTeamsModule {}
