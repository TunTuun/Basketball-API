import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { IPlayer } from '../../models/player.interface';
import { PAGE_SIZE } from '../../constants/app.const';
import { GetRequestService } from '../../services/get-request.service';
import { DEFAULT_PLAYER_IMAGE } from '../../constants/app.const';
import { PlayerInfoComponent } from '../../shared/player-info/player-info.component';
import { IFullInfoPlayer } from 'src/app/models/full-info-player.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {
  public isLoaded = false;
  public defaultImage: string = DEFAULT_PLAYER_IMAGE;
  public pageSize: number = PAGE_SIZE;
  public players: Array<IPlayer> = [];
  public playersPerPage: Array<IPlayer> = [];

  constructor(
    private request: GetRequestService,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.request.getPlayers().subscribe((playerList: IFullInfoPlayer[]) => {
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
  }

  imageExists() {
    this.playersPerPage.forEach(player => {
      this.http.get(player.photo, { responseType: 'blob' })
      .subscribe((image) => {
          if (image.type === 'text/html') { player.photo = null }
      });
    });
    this.isLoaded = true;
  }

  openDialog(player) {
    this.dialog.open(PlayerInfoComponent, { data: player });
  }
}
