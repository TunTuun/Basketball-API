import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteTeamsComponent } from './favorite-teams.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteTeamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteTeamsRoutingModule { }
