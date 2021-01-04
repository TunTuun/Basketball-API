import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IPlayer } from '../Models/player.interface';
import { PlayersService } from '../services/players.service';
import { PAGE_SIZE } from '../constants/app.const'
import { IFullInfoPlayer } from '../Models/fullInfoPlayer.interface';
import { GetRequestService } from '../services/get-request.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {

  pageSize = PAGE_SIZE;

  players: Array<IPlayer> = [];
  
  playersPerPage: Array<IPlayer> = [];

  constructor(private playersService: PlayersService, private request: GetRequestService) { }

  ngOnInit(): void {
    this.playersService.InitPlayers()
    .subscribe((playerList: Array<IFullInfoPlayer>) => {
      playerList.forEach(element => {
        const fullname = element.name.split(' ');
        const photoURL = this.request.getImage(fullname[1], fullname[0]);
        this.players.push({
          name: fullname[1],
          surname: fullname[0],
          photo: photoURL,
          team: element.team_name,
          gamesPlayed: element.games_played,
          playerRating: element.player_efficiency_rating
        });
      });
      console.log(this.players);
      this.playersPerPage = this.players.slice(0, 12);
    });
  }

  pageEvent(event) {
    this.playersPerPage = this.players.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    console.log(event);
  }
}
