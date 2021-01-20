import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IFullInfoPlayer } from '../models/full-info-player.interface';
import { URLList } from '../enums/url-list.enum';
import { DEFAULT_HTTP_REQUEST, DEFAULT_TEAM_PLAYERS } from '../constants/app.const';

@Injectable({
  providedIn: 'root'
})

export class GetRequestService {

  constructor(private http: HttpClient) {}

  public getTeams(): Observable<string[]> {
    return this.http.get<string[]>(`${DEFAULT_HTTP_REQUEST}/${URLList.TEAMS}`)
    .pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getPlayers(): Observable<IFullInfoPlayer[]> {
    return this.http.get<IFullInfoPlayer[]>(`${DEFAULT_HTTP_REQUEST}/${URLList.PLAYERS}`)
    .pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getTeamPlayers(teamName: string): Observable<IFullInfoPlayer[]> {
    return this.http.get<IFullInfoPlayer[]>(`${DEFAULT_HTTP_REQUEST}/${DEFAULT_TEAM_PLAYERS}/${teamName}`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
