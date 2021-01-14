import { Injectable } from '@angular/core';
import { IPlayer } from '../models/player.interface';
import { ITeam } from '../models/team.interface';

@Injectable({
  providedIn: 'root'
})

export class CacheService {

  localDataExists(request: string): boolean {
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
}
