import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamGuard } from 'src/app/guards/team.guard';
import { TeamComponent } from '../team/team.component';
import { TeamsComponent } from './teams.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent
  },
  {
    path: ':team',
    component: TeamComponent,
    canActivate: [TeamGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeamsRoutingModule { }
