import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { TeamsComponent } from './teams.component';
import { SpinnerModule } from '../../shared/spinner/spinner.module';
import { TeamsRoutingModule } from './teams-routing.module';

@NgModule({
  declarations: [
    TeamsComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    TeamsRoutingModule
  ]
})

export class TeamsModule {}
