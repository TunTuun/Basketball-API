import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { PlayerInfoComponent } from '../../shared/player-info/player-info.component';
import { PlayerService } from 'src/app/services/player.service';
import { UpdatePlayersService } from 'src/app/services/update-players.service';
import { GetRequestService } from '../../services/get-request.service';
import { CacheService } from 'src/app/services/cache.service';
import { IPlayer } from '../../models/player.interface';
import { IFullInfoPlayer } from 'src/app/models/full-info-player.interface';
import { PAGE_SIZE } from '../../constants/app.const';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayersComponent implements OnInit, OnDestroy {
  public pageSize: number = PAGE_SIZE;
  public playersPerPage: IPlayer[] = [];
  public isLoaded: boolean;
  public error404: boolean;
  public paginatorLength: number;
  private subscription: Subscription;
  private players: IPlayer[] = [];

  constructor(
    public playerService: PlayerService,
    public updatePlayers: UpdatePlayersService,
    private dialog: MatDialog,
    private request: GetRequestService,
    private cacheService: CacheService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initPlayers();
    this.initListeners();
    this.pageLoaded();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public pageEvent(event: PageEvent): void {
    this.playersPerPage = this.players.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
  }

  public openDialog(player: IPlayer): void {
    this.dialog.open(PlayerInfoComponent, { data: player, autoFocus: false });
  }

  private initListeners(): void {
    this.updatePlayers.submitted.subscribe(() => {
      this.initPlayers();
      this.ref.markForCheck();
    });
  }

  private initPlayers(): void {
    if (!this.cacheService.cacheDataExists('players')) {
      this.subscription =
      this.request.getPlayers().subscribe((playerList: IFullInfoPlayer[]) => {
        this.players = this.playerService.createPlayersFromAPI(playerList);
        this.paginatorLength = this.players.length;
        this.playersPerPage = this.players.slice(0, 12);
        this.ref.markForCheck();
      },
      () => {
        this.error404 = true;
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
