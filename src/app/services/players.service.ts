import { Injectable } from '@angular/core';
import { GetRequestService } from './get-request.service';
import { IPlayer } from '../Models/player.interface';
import { IFullInfoPlayer } from '../Models/fullInfoPlayer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private request: GetRequestService) { }

  InitPlayers(): Observable<IFullInfoPlayer[]> {
    return this.request.getPlayers();
  }
}
