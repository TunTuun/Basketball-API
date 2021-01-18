import { Component, OnInit } from '@angular/core';

import { IPlayer } from 'src/app/models/player.interface';
import { CacheService } from 'src/app/services/cache.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite-players.component.html',
  styleUrls: ['./favorite-players.component.scss']
})
export class FavoritePlayersComponent implements OnInit {
  public playersExist: boolean;
  public favoritePlayers: IPlayer[] = [];
  public isLoaded: boolean = true;

  constructor(
    public playersService: PlayerService,
    public cacheService: CacheService) { }

  ngOnInit(): void {
    this.initFavoritePlayers();
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

  public removeFavoritePlayer(playerName: string, playerSurname: string): void {
    this.cacheService.removeFavoritePlayer(playerName, playerSurname);
    this.initFavoritePlayers();
  }
}
