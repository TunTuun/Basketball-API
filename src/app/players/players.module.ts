import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlayersComponent } from "./players.component";
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    PlayersComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  exports: [
    PlayersComponent
  ]
})

export class PlayersModule {}