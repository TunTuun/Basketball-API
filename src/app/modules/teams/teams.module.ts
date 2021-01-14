import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamModule } from '../team/team.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TeamsComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    TeamsRoutingModule,
    TeamModule,
    MatDialogModule
  ]
})

export class TeamsModule {}
