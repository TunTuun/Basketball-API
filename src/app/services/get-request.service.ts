import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_HTTP_REQUEST } from '../constants/app.const';
import { URLList } from '../enums/url-list.enum';
import { IFullInfoPlayer } from '../models/full-info-player.interface';

@Injectable({
  providedIn: 'root'
})
export class GetRequestService {

  constructor(private http: HttpClient) {}

  getTeams(): Observable<string[]> {
    return this.http.get<string[]>(`${DEFAULT_HTTP_REQUEST}/${URLList.TEAMS}`);
  }

  getPlayers(): Observable<IFullInfoPlayer[]> {
    return this.http.get<IFullInfoPlayer[]>(`${DEFAULT_HTTP_REQUEST}/${URLList.PLAYERS}`);
  }

  getImage(name, surname) {
    return (`${DEFAULT_HTTP_REQUEST}/${URLList.PLAYER_IMAGE}/${name}/${surname}`);
  }
}
