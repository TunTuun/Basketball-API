import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlayersComponent } from "./players.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { SpinnerModule } from "../../shared/spinner/spinner.module";

@NgModule({
  declarations: [
    PlayersComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    SpinnerModule
  ],
  exports: [
    PlayersComponent
  ]
})

export class PlayersModule {}