import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PAGE_SIZE } from '../../constants/app.const';
import { IPlayer } from '../../models/player.interface';
import { IFullInfoPlayer } from 'src/app/models/full-info-player.interface';
import { PlayerService } from 'src/app/services/player.service';
import { GetRequestService } from '../../services/get-request.service';
import { PlayerInfoComponent } from '../../shared/player-info/player-info.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {
  public pageSize: number = PAGE_SIZE;
  public players: IPlayer[] = [];
  public playersPerPage: IPlayer[] = [];
  public isLoaded: boolean;

  constructor(
    private request: GetRequestService,
    public dialog: MatDialog,
    public playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.request.getPlayers().subscribe((playerList: IFullInfoPlayer[]) => {
      this.players = this.playerService.createPlayerFromAPI(playerList);
      this.playersPerPage = this.players.slice(0, 12);
      this.isLoaded = true;
    });
  }

  pageEvent(event): void {
    this.playersPerPage = this.players.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
  }

  openDialog(player): void {
    this.dialog.open(PlayerInfoComponent, { data: player });
  }
}
