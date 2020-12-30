import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IPlayer } from '../Models/player.interface';
import { PlayersService } from '../services/players.service';
import { PAGE_SIZE } from '../constants/app.const'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})

export class PlayersComponent implements OnInit {

  pageSize = PAGE_SIZE;

  players: Array<IPlayer> = [];
  
  playersPerPage: Array<IPlayer> = [];

  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {
    this.players = this.playersService.InitPlayers();
    this.playersPerPage = this.players.slice(0, this.pageSize);
    console.log(this.playersPerPage)
  }

  pageEvent(event) {
    this.playersPerPage = this.players.slice(0, this.pageSize);
    console.log(event)
  }
}
