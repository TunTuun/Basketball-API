import { Injectable } from '@angular/core';
import { DEFAULT_TEAM_IMAGE, TEAMS_IMAGE_URL } from '../constants/app.const'
import { ITeam } from '../models/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  
  findTeamImage(teamName: string): string {
    return TEAMS_IMAGE_URL + teamName + '.png';
  }

  setDefaultImage(event): void {
    event.target.src = DEFAULT_TEAM_IMAGE;
  }

  createTeamsFromAPI(teamsAPIList): ITeam[] {
    let teams: ITeam[] = [];
    teamsAPIList.forEach(teamName => {
      const imageURL = this.findTeamImage(teamName);
      teams.push({
        name: teamName,
        image: imageURL
      });
    });
    return teams;
  }
}
