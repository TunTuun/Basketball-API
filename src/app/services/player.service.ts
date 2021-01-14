import { Injectable } from '@angular/core';
import { DEFAULT_HTTP_REQUEST, DEFAULT_PLAYER_IMAGE } from '../constants/app.const';
import { URLList } from '../enums/url-list.enum';
import { IFullInfoPlayer } from '../models/full-info-player.interface';
import { IPlayer } from '../models/player.interface';
import { GetRequestService } from './get-request.service';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private request: GetRequestService) { }

  getPlayerImageURL(name: string, surname: string): string {
    return (`${DEFAULT_HTTP_REQUEST}/${URLList.PLAYER_IMAGE}/${name}/${surname}`);
  }

  setDefaultImage(event): void {
    event.target.src = DEFAULT_PLAYER_IMAGE;
  }

  createPlayersFromAPI(playersAPIList: IFullInfoPlayer[]): IPlayer[] {
    let players: IPlayer[] = [];
    playersAPIList.forEach(element => {
      const fullname = element.name.split(' ');
      const photoURL = this.getPlayerImageURL(fullname[1], fullname[0]);
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
