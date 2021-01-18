import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public isFavorite: boolean;
  public formIsOpened: boolean;
  public playerData: IPlayer = this.data;
  public form: FormGroup;

  constructor(
    public playerService: PlayerService,
    public dialogRef: MatDialogRef<PlayerInfoComponent>,
    public cacheService: CacheService,
    @Inject(MAT_DIALOG_DATA) public data: IPlayer) {}

  ngOnInit(): void {
    this.checkFavorite(this.playerData.name, this.playerData.surname);
    this.initForm();
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

  public openForm(): void {
    this.formIsOpened = true;
    this.form.get('gamesPlayed').enable();
    this.form.get('playerRating').enable();
  }

  public closeForm(): void {
    this.formIsOpened = false;
    this.form.get('gamesPlayed').disable();
    this.form.get('playerRating').disable();
  }

  public submitPlayer(): void {
    if (this.form.valid) {
      this.form.value.playerRating = parseFloat(this.form.value.playerRating).toFixed(1);
      this.cacheService.editPlayerInfo(this.playerData.name, this.playerData.surname, this.form.value);
      this.closeForm();
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      gamesPlayed: new FormControl(null, [Validators.maxLength(3), Validators.required, Validators.pattern('^[0-9]*$')]),
      playerRating : new FormControl(null, [Validators.required, Validators.max(5), Validators.maxLength(3), Validators.pattern('^[0-9]*[.]?[0-9]+$')])
    });
    this.form.get('gamesPlayed').disable();
    this.form.get('playerRating').disable();
  }
}
