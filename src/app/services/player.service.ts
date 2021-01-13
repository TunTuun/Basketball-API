import { Injectable } from '@angular/core';
import { DEFAULT_PLAYER_IMAGE } from '../constants/app.const';
import { IFullInfoPlayer } from '../models/full-info-player.interface';
import { IPlayer } from '../models/player.interface';
import { GetRequestService } from './get-request.service';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private request: GetRequestService) { }

  setDefaultImage(event): void {
    event.target.src = DEFAULT_PLAYER_IMAGE;
  }

  createPlayerFromAPI(playersAPIList: IFullInfoPlayer[]): IPlayer[] {
    let players: IPlayer[] = [];
    playersAPIList.forEach(element => {
      const fullname = element.name.split(' ');
      const photoURL = this.request.getImage(fullname[1], fullname[0]);
      players.push({
        name: fullname[1],
        surname: fullname[0],
        photo: photoURL,
        team: element.team_name,
        gamesPlayed: element.games_played,
        playerRating: element.player_efficiency_rating
      });
    });
    return players;
  }
}
