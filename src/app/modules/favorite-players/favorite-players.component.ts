import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PlayerInfoComponent } from 'src/app/shared/player-info/player-info.component';
import { CacheService } from 'src/app/services/cache.service';
import { PlayerService } from 'src/app/services/player.service';
import { UpdatePlayersService } from 'src/app/services/update-players.service';
import { IPlayerID } from 'src/app/models/player-id.interface';
import { IPlayer } from 'src/app/models/player.interface';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite-players.component.html',
  styleUrls: ['./favorite-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FavoritePlayersComponent implements OnInit {
  public playersExist: boolean;
  public favoritePlayers: IPlayer[] = [];
  public isLoaded: boolean;

  constructor(
    public playersService: PlayerService,
    public cacheService: CacheService,
    public updatePlayers: UpdatePlayersService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initFavoritePlayers();
    this.initListeners();
  }

  public removeFavoritePlayer(playerName: string, playerSurname: string): void {
    this.cacheService.removeFavoritePlayer(playerName, playerSurname);
    this.initFavoritePlayers();
  }

  public openDialog(player: IPlayer): void {
    this.dialog.open(PlayerInfoComponent, { data: player, autoFocus: false });
  }

  private initFavoritePlayers(): void {
    const players: IPlayer[] = JSON.parse(this.cacheService.getCacheData('players'));
    if (players) {
      const favoritePlayers = JSON.parse(this.cacheService.getCacheData('favoritePlayers'))?.favoritePlayers;
      if (favoritePlayers && favoritePlayers.length !== 0) {
        this.playersExist = true;
        this.favoritePlayers.length = 0;
        favoritePlayers.forEach((playerID: IPlayerID) => {
          const favoritePlayer = players.find(player => player.name === playerID.name && player.surname === playerID.surname);
          if (favoritePlayer) {
            this.favoritePlayers.push(favoritePlayer);
          }
        });
      } else {
        this.playersExist = false;
        this.cacheService.initFavoritePlayers();
      }
    } else {
      this.playersExist = false;
    }
    this.isLoaded = true;
  }

  private initListeners(): void {
    this.updatePlayers.submitted.subscribe(() => {
      this.initFavoritePlayers();
      this.ref.markForCheck();
    });
  }
}
