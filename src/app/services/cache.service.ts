import { Injectable } from '@angular/core';
import { IPlayer } from '../models/player.interface';
import { ITeam } from '../models/team.interface';

@Injectable({
  providedIn: 'root'
})

export class CacheService {
  cacheDataExists(request: string): boolean {
    return localStorage.getItem(request) ? true : false;
  }

  getCacheData(request: string): string {
    return localStorage.getItem(request);
  }

  cacheTeams(teams: ITeam[]): void {
    localStorage.setItem('teams', JSON.stringify(teams));
  }

  cachePlayers(players: IPlayer[]): void {
    localStorage.setItem('players', JSON.stringify(players));
  }

  initFavoriteTeams(): void {
    localStorage.setItem('favoriteTeams', JSON.stringify({favoriteTeams: []}));
  }

  addFavoriteTeam(team: string): void {
    if (!this.getCacheData('favoriteTeams')) {
      localStorage.setItem('favoriteTeams', JSON.stringify({favoriteTeams: []}))
    }
    localStorage.setItem('favoriteTeams',
    JSON.stringify(
      JSON.parse(this.getCacheData('favoriteTeams')).favoriteTeams.push(team)));
  }

  removeFavoriteTeam(teamName: string): boolean {
    localStorage.setItem('favoriteTeams',
      JSON.stringify(
        {"favoriteTeams" : (JSON.parse(localStorage.getItem('favoriteTeams')).favoriteTeams)
        .filter((team: string) => team !== teamName)}
      )
    );
      return true;
  }
}
