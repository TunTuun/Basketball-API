import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./app/shared/page-not-found/error.component";
import { FavoriteComponent } from "./app/modules/favorite/favorite.component";
import { PlayersComponent } from "./app/modules/players/players.component";
import { TeamsComponent } from "./app/modules/teams/teams.component";

const routes: Routes = [
  { path: 'teams', component: TeamsComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'error', component: ErrorComponent },
  { path: '',  pathMatch: 'full', redirectTo: 'teams' },
  { path: '**', redirectTo: 'error' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}