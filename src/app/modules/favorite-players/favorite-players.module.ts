import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { FavoriteRoutingModule } from './favorite-players-routing.module';
import { FavoritePlayersComponent } from './favorite-players.component';

@NgModule({
  declarations: [FavoritePlayersComponent],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    SpinnerModule,
    MatDialogModule
  ]
})

export class FavoritePlayersModule {}
