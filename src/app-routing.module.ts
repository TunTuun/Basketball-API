import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'teams',
    loadChildren: () => import('./app/modules/teams/teams.module').then(m => m.TeamsModule),
  },
  { path: 'players',
    loadChildren: () => import('./app/modules/players/players.module').then(m => m.PlayersModule)
  },
  { path: 'favorite-teams',
    loadChildren: () => import('./app/modules/favorite-teams/favorite-teams.module').then(m => m.FavoriteTeamsModule)
  },
  {
    path: 'favorite-players',
    loadChildren: () => import('./app/modules/favorite-players/favorite-players.module').then(m => m.FavoritePlayersModule)
  },
  { path: 'error',
    loadChildren: () => import('./app/shared/error/error.module').then(m => m.ErrorModule)
  },
  { path: '',  pathMatch: 'full', redirectTo: 'teams' },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
