import { Injectable } from '@angular/core';
import { IPlayer } from '../models/player.interface';
import { ITeam } from '../models/team.interface';

@Injectable({
  providedIn: 'root'
})

export class CacheAPIDataService {

  constructor() {}

  cacheTeams(teams: ITeam[]): void {
    
  }

  cachePlayers(players: IPlayer[]): void {

  }
}
