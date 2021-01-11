import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IPlayer } from "../../../models/player.interface";

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
}