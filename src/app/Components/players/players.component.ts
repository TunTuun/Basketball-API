import { Component, OnInit } from '@angular/core';
import { IPlayer } from '../../Models/player.interface';
import { PlayersService } from '../../Services/players.service';
import { PAGE_SIZE } from '../../Constants/app.const'
import { IFullInfoPlayer } from '../../Models/fullInfoPlayer.interface';
import { GetRequestService } from '../../Services/get-request.service';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_PLAYER_IMAGE } from '../../Constants/app.const';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {

  imageCountLoaded = null;

  isLoaded = false;

  defaultImage = DEFAULT_PLAYER_IMAGE;

  pageSize = PAGE_SIZE;

  players: Array<IPlayer> = [];
  
  playersPerPage: Array<IPlayer> = [];

  constructor(private playersService: PlayersService, private request: GetRequestService, private http: HttpClient) { }

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
      this.playersPerPage = this.players.slice(0, 12);
      this.imageExists();
    });
  }

  pageEvent(event) {
    this.playersPerPage = this.players.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
    this.imageExists();
    this.isLoaded = false;
  }

  imageExists() {
    this.playersPerPage.forEach(player => {
      this.http.get(player.photo, {responseType: 'blob'}).subscribe((image) => {
        if (image.type === 'text/html') {player.photo = null} 
      });
    });
  }

  imageLoaded() {
    if (this.imageCountLoaded === 11) {
      this.imageCountLoaded = null;
      this.isLoaded = true;
    } else {
      this.imageCountLoaded++;
    }
  }
 }
