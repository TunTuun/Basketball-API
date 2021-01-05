import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./app/Error/error.component";
import { FavoriteComponent } from "./app/Components/favorite/favorite.component";
import { PlayersComponent } from "./app/Components/players/players.component";
import { TeamsComponent } from "./app/Components/teams/teams.component";

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