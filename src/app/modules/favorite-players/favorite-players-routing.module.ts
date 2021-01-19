import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritePlayersComponent } from './favorite-players.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritePlayersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FavoriteRoutingModule { }
