import { Component, OnInit } from '@angular/core';
import { ITeam } from 'src/app/models/team.interface';
import { CacheService } from 'src/app/services/cache.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite-teams.component.html',
  styleUrls: ['./favorite-teams.component.scss']
})
export class FavoriteTeamsComponent implements OnInit {
  public teamsExist: boolean;
  public favoriteTeams: ITeam[] = [];
  public isLoaded: boolean;
  constructor(
    public teamsService: TeamsService,
    public cacheService: CacheService
    ) { }

  ngOnInit(): void {
    this.initFavoriteTeams();
  }

  private initFavoriteTeams(): void {
    const teams: ITeam[] = JSON.parse(this.cacheService.getCacheData('teams'));
    if (teams) {
      const favoriteTeams = JSON.parse(this.cacheService.getCacheData('favoriteTeams'))?.favoriteTeams;
      if (favoriteTeams && favoriteTeams.length > 0) {
        this.teamsExist = true;
        this.favoriteTeams.length = 0;
        favoriteTeams.forEach(teamName => {
          const favoriteTeam = teams.find(team => team.name === teamName);
          if (favoriteTeam) {
            this.favoriteTeams.push(favoriteTeam);
          }
        });
        this.isLoaded = true;
      } else {
        this.teamsExist = false;
        this.cacheService.initFavoriteTeams();
        this.isLoaded = true;
      }
    } else {
      this.teamsExist = false;
      this.isLoaded = true;
    }
  }

  public removeFavoriteTeam(teamName: string): void {
    if (this.cacheService.removeFavoriteTeam(teamName)) {
      this.initFavoriteTeams();
    }
  }
}
