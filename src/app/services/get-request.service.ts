import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_HTTP_REQUEST, DEFAULT_TEAM_PLAYERS } from '../constants/app.const';
import { URLList } from '../enums/url-list.enum';
import { IFullInfoPlayer } from '../models/full-info-player.interface';
import { ITeam } from '../models/team.interface';

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

  getImage(name: string, surname: string): string {
    return (`${DEFAULT_HTTP_REQUEST}/${URLList.PLAYER_IMAGE}/${name}/${surname}`);
  }

  getTeamPlayers(teamName: string): Observable<IFullInfoPlayer[]> {
    return this.http.get<IFullInfoPlayer[]>(`${DEFAULT_HTTP_REQUEST}/${DEFAULT_TEAM_PLAYERS}/${teamName}`);
  }
}
