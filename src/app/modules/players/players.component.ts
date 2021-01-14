import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE } from '../../constants/app.const';
import { IPlayer } from '../../models/player.interface';
import { IFullInfoPlayer } from 'src/app/models/full-info-player.interface';
import { PlayerService } from 'src/app/services/player.service';
import { GetRequestService } from '../../services/get-request.service';
import { PlayerInfoComponent } from '../../shared/player-info/player-info.component';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {
  
  public pageSize: number = PAGE_SIZE;
  public playersPerPage: IPlayer[] = [];
  public isLoaded: boolean;
  public paginatorLength: number;
  private players: IPlayer[] = [];

  constructor(
    public playerService: PlayerService,
    private dialog: MatDialog,
    private request: GetRequestService,
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    this.initPlayers();
    this.pageLoaded();
  }

  pageEvent(event: PageEvent): void {
    this.playersPerPage = this.players.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
  }

  openDialog(player: IPlayer): void {
    this.dialog.open(PlayerInfoComponent, { data: player });
  }

  private initPlayers(): void {
    if (!this.cacheService.localDataExists('players')) {
      this.request.getPlayers().subscribe((playerList: IFullInfoPlayer[]) => {
        this.players = this.playerService.createPlayersFromAPI(playerList);
        this.paginatorLength = this.players.length;
        this.playersPerPage = this.players.slice(0, 12);
      });
    } else {
      this.players = JSON.parse(this.cacheService.getCacheData('players'));
      this.paginatorLength = this.players.length;
      this.playersPerPage = this.players.slice(0, 12);
    }
  }

  private pageLoaded(): void {
    this.isLoaded = true;
  }
}
