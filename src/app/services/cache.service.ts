import { Injectable } from '@angular/core';

import { IPlayerChangableValues } from '../models/player-changable-values.interface';
import { IPlayer } from '../models/player.interface';
import { ITeam } from '../models/team.interface';

@Injectable({
  providedIn: 'root'
})

export class CacheService {
  public cacheDataExists(request: string): boolean {
    return localStorage.getItem(request) ? true : false;
  }

  public getCacheData(request: string): string {
    return localStorage.getItem(request);
  }

  public cacheTeams(teams: ITeam[]): void {
    localStorage.setItem('teams', JSON.stringify(teams));
  }

  public cachePlayers(players: IPlayer[]): void {
    localStorage.setItem('players', JSON.stringify(players));
  }

  public initFavoriteTeams(): void {
    localStorage.setItem('favoriteTeams', JSON.stringify({ favoriteTeams: [] }));
  }

  public addFavoriteTeam(team: string): void {
    if (!this.getCacheData('favoriteTeams')) {
      this.initFavoriteTeams();
    }
    const favoriteTeamsList = JSON.parse(this.getCacheData('favoriteTeams')).favoriteTeams;
    favoriteTeamsList.push(team);
    localStorage.setItem('favoriteTeams', JSON.stringify({ favoriteTeams: favoriteTeamsList }));
  }

  public removeFavoriteTeam(teamName: string): void {
    localStorage.setItem('favoriteTeams',
      JSON.stringify(
        {
          favoriteTeams: (JSON.parse(localStorage.getItem('favoriteTeams')).favoriteTeams)
            .filter((team: string) => team !== teamName)
        }
      )
    );
  }

  public isTeamFavorite(teamName: string): boolean {
    if (this.cacheDataExists('favoriteTeams')) {
      return JSON.parse(this.getCacheData('favoriteTeams')).favoriteTeams.includes(teamName);
    } else {
      return false;
    }
  }

  public initFavoritePlayers(): void {
    localStorage.setItem('favoritePlayers', JSON.stringify({ favoritePlayers: [] }));
  }

  public addFavoritePlayer(playerName: string, playerSurname: string): void {
    if (!this.getCacheData('favoritePlayers')) {
      this.initFavoritePlayers();
    }
    const favoritePlayersList = JSON.parse(this.getCacheData('favoritePlayers')).favoritePlayers;
    favoritePlayersList.push({ name: playerName, surname: playerSurname });
    localStorage.setItem('favoritePlayers', JSON.stringify({ favoritePlayers: favoritePlayersList }));
  }

  public removeFavoritePlayer(playerName: string, playerSurname: string): void {
    localStorage.setItem('favoritePlayers',
      JSON.stringify({
        favoritePlayers: (JSON.parse(localStorage.getItem('favoritePlayers')).favoritePlayers)
          .filter((player: IPlayer) => player.name !== playerName || player.surname !== playerSurname)
      }));
  }

  public isPlayerFavorite(playerName: string, playerSurname: string): boolean {
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

  public editPlayerInfo(playerName: string, playerSurname: string, changeValue: IPlayerChangableValues): void {
    const players: IPlayer[] = JSON.parse(this.getCacheData('players'));
    const changedPlayer = players.find((p: IPlayer) => p.name === playerName && p.surname === playerSurname);
    changedPlayer.gamesPlayed = changeValue.gamesPlayed;
    changedPlayer.playerRating = changeValue.playerRating;
    this.cachePlayers(players);
  }

  public getPlayer(name: string, surname: string): IPlayer {
    if (this.cacheDataExists('players')) {
      return JSON.parse(this.getCacheData('players')).find((p: IPlayer) => p.name === name && p.surname === surname);
    }
  }
}
