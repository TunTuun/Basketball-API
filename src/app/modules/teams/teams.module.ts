import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { TeamModule } from '../team/team.module';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';

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
