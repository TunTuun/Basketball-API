import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DEFAULT_PLAYER_IMAGE } from "src/app/constants/app.const";
import { IPlayer } from "src/app/Models/player.interface";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})

export class PlayerInfoComponent {

  playerData: IPlayer = this.data;

  constructor(public dialogRef: MatDialogRef<PlayerInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: IPlayer) {}

  dialogClose() {
    this.dialogRef.close();
  }

  setPlayerDefaultImage(event) {
    event.target.src = DEFAULT_PLAYER_IMAGE;
  }
}