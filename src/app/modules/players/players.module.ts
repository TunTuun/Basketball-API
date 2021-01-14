import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PlayersComponent } from './players.component';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { PlayersRoutingModule } from './players-routing.module';

@NgModule({
  declarations: [
    PlayersComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    MatPaginatorModule,
    SpinnerModule,
    MatDialogModule
  ]
})

export class PlayersModule {}
