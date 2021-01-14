import { Injectable } from '@angular/core';
import { DEFAULT_HTTP_REQUEST, DEFAULT_PLAYER_IMAGE } from '../constants/app.const';
import { URLList } from '../enums/url-list.enum';
import { IFullInfoPlayer } from '../models/full-info-player.interface';
import { IPlayer } from '../models/player.interface';
import { CacheService } from './cache.service';
import { GetRequestService } from './get-request.service';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private request: GetRequestService, private cacheService: CacheService) { }

  getAllPlayers(): IPlayer[] {
    let allPlayers: IPlayer[];
    this.request.getPlayers().subscribe((playerList: IFullInfoPlayer[]) => {
      allPlayers = this.createPlayersFromAPI(playerList);
    });
    return allPlayers;
  }

  getTeamPlayers(teamAcronym: string): IPlayer[] {
    let teamPlayers: IPlayer[] = [];
    teamPlayers = JSON.parse(this.cacheService.getCacheData('players'))
      .filter(player => player.teamAcronym === teamAcronym);
    return teamPlayers
  }

  getPlayerImageURL(name: string, surname: string): string {
    return (`${DEFAULT_HTTP_REQUEST}/${URLList.PLAYER_IMAGE}/${name}/${surname}`);
  }

  setDefaultImage(event): void {
    event.target.src = DEFAULT_PLAYER_IMAGE;
  }

  createPlayersFromAPI(playersAPIList: IFullInfoPlayer[]): IPlayer[] {
    let players: IPlayer[] = [];
    if (!this.cacheService.localDataExists('players')) {
      playersAPIList.forEach(element => {
        const fullname = element.name.split(' ');
        const photoURL = this.getPlayerImageURL(fullname[1], fullname[0]);
        players.push({
          name: fullname[1],
          surname: fullname[0],
          photo: photoURL,
          team: element.team_name,
          teamAcronym: element.team_acronym,
          gamesPlayed: element.games_played,
          playerRating: element.player_efficiency_rating
        });
      });
      this.cacheService.cachePlayers(players);
    } else {
      players = JSON.parse(this.cacheService.getCacheData('players'));
    }
    return players;
  }
}
