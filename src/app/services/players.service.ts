import { Injectable } from '@angular/core';
import { GetRequestService } from './get-request.service';
import { IPlayer } from '../Models/player.interface';
import { IFullInfoPlayer } from '../Models/full-info-player.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private request: GetRequestService, private http: HttpClient) { }

  InitPlayers(): Observable<IFullInfoPlayer[]> {
    return this.request.getPlayers();
  }
}
