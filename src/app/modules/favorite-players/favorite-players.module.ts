import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { FavoritePlayersComponent } from './favorite-players.component';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { FavoriteRoutingModule } from './favorite-players-routing.module';

@NgModule({
  declarations: [
    FavoritePlayersComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    SpinnerModule,
    MatDialogModule
  ]
})

export class FavoritePlayersModule {}
