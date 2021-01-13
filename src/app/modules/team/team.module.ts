import { NgModule } from '@angular/core';
import { TeamComponent } from './team.component';
import { TeamRoutingModule } from './team-routing.module';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';

@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SpinnerModule
  ]
})

export class TeamModule { }
