import { Injectable } from '@angular/core';
import { ITeam } from '../Models/team.interface';
import { GetRequestService } from './get-request.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private request: GetRequestService) { }

  InitTeams() {
    let teams: Array<ITeam>;
    this.request.getTeams().subscribe((teamList: string[]) => {
      teamList.forEach(element => {

        // teams.push()
      });
    });
  }
}
