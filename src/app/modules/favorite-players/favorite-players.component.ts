import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IPlayer } from 'src/app/models/player.interface';
import { CacheService } from 'src/app/services/cache.service';
import { PlayerService } from 'src/app/services/player.service';
import { UpdatePlayersService } from 'src/app/services/update-players.service';
import { PlayerInfoComponent } from 'src/app/shared/player-info/player-info.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite-players.component.html',
  styleUrls: ['./favorite-players.component.scss']
})
export class FavoritePlayersComponent implements OnInit {
  public playersExist: boolean;
  public favoritePlayers: IPlayer[] = [];
  public isLoaded: boolean;

  constructor(
    public playersService: PlayerService,
    public cacheService: CacheService,
    public updatePlayers: UpdatePlayersService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initFavoritePlayers();
    this.initListeners();
  }

  private initFavoritePlayers(): void {
    const players: IPlayer[] = JSON.parse(this.cacheService.getCacheData('players'));
    if (players) {
      const favoritePlayers = JSON.parse(this.cacheService.getCacheData('favoritePlayers'))?.favoritePlayers;
      if (favoritePlayers && favoritePlayers.length !== 0) {
        this.playersExist = true;
        this.favoritePlayers.length = 0;
        favoritePlayers.forEach((playerID) => {
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

  private initListeners() {
    this.updatePlayers.submitted.subscribe(() => {
      this.initFavoritePlayers();
    });
  }

  public removeFavoritePlayer(playerName: string, playerSurname: string): void {
    this.cacheService.removeFavoritePlayer(playerName, playerSurname);
    this.initFavoritePlayers();
  }

  public openDialog(player: IPlayer): void {
    this.dialog.open(PlayerInfoComponent, { data: player, autoFocus: false });
  }
}
