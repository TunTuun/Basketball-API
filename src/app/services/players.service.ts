import { Injectable } from '@angular/core';
import { GetRequestService } from './get-request.service';
import { IPlayer } from '../Models/player.interface';
import { IFullInfoPlayer } from '../Models/fullInfoPlayer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private request: GetRequestService) { }

  InitPlayers(): Array<IPlayer> {
    let players: Array<IPlayer> = [];
    this.request.getPlayers().subscribe((playerList: Array<IFullInfoPlayer>) => {
      playerList.forEach(element => {
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
    });
    return players;
  }
}
