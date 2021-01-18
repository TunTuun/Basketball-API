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
    localStorage.setItem('favoriteTeams', JSON.stringify({ favoriteTeams: [] }));
  }

  addFavoriteTeam(team: string): void {
    if (!this.getCacheData('favoriteTeams')) {
      this.initFavoriteTeams();
    }
    const favoriteTeamsList = JSON.parse(this.getCacheData('favoriteTeams')).favoriteTeams;
    favoriteTeamsList.push(team);
    localStorage.setItem('favoriteTeams', JSON.stringify({ favoriteTeams : favoriteTeamsList }));
  }

  removeFavoriteTeam(teamName: string): void {
    localStorage.setItem('favoriteTeams',
      JSON.stringify(
        {
          favoriteTeams: (JSON.parse(localStorage.getItem('favoriteTeams')).favoriteTeams)
            .filter((team: string) => team !== teamName)
        }
      )
    );
  }

  isTeamFavorite(teamName: string): boolean {
    if (this.cacheDataExists('favoriteTeams')) {
      return JSON.parse(this.getCacheData('favoriteTeams')).favoriteTeams.includes(teamName);
    } else {
      return false;
    }
  }

  initFavoritePlayers(): void {
    localStorage.setItem('favoritePlayers', JSON.stringify({ favoritePlayers: [] }));
  }

  addFavoritePlayer(playerName: string, playerSurname: string): void {
    if (!this.getCacheData('favoritePlayers')) {
      this.initFavoritePlayers();
    }
    const favoritePlayersList = JSON.parse(this.getCacheData('favoritePlayers')).favoritePlayers;
    favoritePlayersList.push({ name : playerName, surname : playerSurname });
    localStorage.setItem('favoritePlayers', JSON.stringify({ favoritePlayers: favoritePlayersList }));
  }

  removeFavoritePlayer(playerName: string, playerSurname: string): void {
    localStorage.setItem('favoritePlayers',
    JSON.stringify({
      favoritePlayers: (JSON.parse(localStorage.getItem('favoritePlayers')).favoritePlayers)
        .filter((player: IPlayer) => player.name !== playerName || player.surname !== playerSurname)
    }));
  }

  isPlayerFavorite(playerName: string, playerSurname: string): boolean {
    if (this.cacheDataExists('favoritePlayers')) {
      if (JSON.parse(this.getCacheData('favoritePlayers')).favoritePlayers.filter(
        (p: IPlayer) => p.name === playerName && p.surname === playerSurname).length > 0) {
          return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
