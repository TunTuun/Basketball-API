import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerInfoComponent } from './player-info.component';

@NgModule({
  declarations: [
    PlayerInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})

export class PlayerInfoModule {}
