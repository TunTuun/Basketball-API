import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayersComponent } from './players.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { PlayersRoutingModule } from './players-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

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
