import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DEFAULT_PLAYER_IMAGE } from 'src/app/constants/app.const';
import { IPlayer } from 'src/app/Models/player.interface';
import { CacheService } from 'src/app/services/cache.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})

export class PlayerInfoComponent implements OnInit {
  isFavorite: boolean;
  playerData: IPlayer = this.data;

  constructor(
    public playerService: PlayerService,
    public dialogRef: MatDialogRef<PlayerInfoComponent>,
    public cacheService: CacheService,
    @Inject(MAT_DIALOG_DATA) public data: IPlayer) {}

  ngOnInit(): void {
    this.checkFavorite(this.playerData.name, this.playerData.surname);
  }

  dialogClose(): void {
    this.dialogRef.close();
  }

  setPlayerDefaultImage(event): void {
    event.target.src = DEFAULT_PLAYER_IMAGE;
  }

  public checkFavorite(playerName: string, playerSurname: string): void {
    if (this.cacheService.isPlayerFavorite(playerName, playerSurname)) {
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
    }
  }
}
