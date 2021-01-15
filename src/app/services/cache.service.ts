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
    let favoriteTeamsList = JSON.parse(this.getCacheData('favoriteTeams')).favoriteTeams;
    favoriteTeamsList.push(team);
    localStorage.setItem('favoriteTeams', JSON.stringify({"favoriteTeams" : favoriteTeamsList}));
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

  isFavorite(teamName: string): boolean {
    if (this.cacheDataExists('favoriteTeams')) {
      console.log(JSON.parse(this.getCacheData('favoriteTeams')).favoriteTeams.includes(teamName))
      return JSON.parse(this.getCacheData('favoriteTeams')).favoriteTeams.includes(teamName);
    } else {
      return false;
    }
  }
}
