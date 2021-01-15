import { Injectable } from '@angular/core';
import { DEFAULT_TEAM_IMAGE, TEAMS_IMAGE_URL } from '../constants/app.const';
import { ITeam } from '../models/team.interface';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private cacheService: CacheService) {}

  public findTeamImage(teamName: string): string {
    return TEAMS_IMAGE_URL + teamName + '.png';
  }

  public teamExists(teamName: string): boolean {
    return Boolean(JSON.parse(this.cacheService.getCacheData('teams')).find((team: ITeam) => team.name === teamName));
  }

  public setDefaultImage(event: Event): void {
    (event.target as HTMLImageElement).src = DEFAULT_TEAM_IMAGE;
  }

  public createTeamsFromAPI(teamsAPIList: string[]): ITeam[] {
    let teams: ITeam[] = [];
    if (!this.cacheService.localDataExists('teams')) {
      teamsAPIList.forEach((teamName: string) => {
        const imageURL = this.findTeamImage(teamName);
        teams.push({
          name: teamName,
          image: imageURL
        });
      });
      this.cacheService.cacheTeams(teams);
    } else {
      teams = JSON.parse(this.cacheService.getCacheData('teams'));
    }
    return teams;
  }
}
