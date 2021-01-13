import { Component, OnInit } from '@angular/core';
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
  public pageSize: number = PAGE_SIZE;
  public players: Array<IPlayer> = [];
  public playersPerPage: Array<IPlayer> = [];

  constructor(
    private request: GetRequestService,
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
      this.isLoaded = true;
    });
  }

  pageEvent(event) {
    this.playersPerPage = this.players.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
  }

  setDefaultImage(event) {
    event.target.src = DEFAULT_PLAYER_IMAGE;
  }

  openDialog(player) {
    this.dialog.open(PlayerInfoComponent, { data: player });
  }
}
