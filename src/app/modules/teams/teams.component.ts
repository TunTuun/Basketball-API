import { Component, OnInit } from '@angular/core';
import { TeamGuard } from 'src/app/guards/team.guard';
import { ITeam } from 'src/app/models/team.interface';
import { CacheService } from 'src/app/services/cache.service';
import { GetRequestService } from 'src/app/services/get-request.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})

export class TeamsComponent implements OnInit {
  public teams: ITeam[];
  public isLoaded: boolean;

  constructor(
    public teamsService: TeamsService,
    private request: GetRequestService,
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    this.initTeams();
    this.pageLoaded();
  }

  private initTeams(): void {
    if (!this.cacheService.localDataExists('teams')) {
      this.request.getTeams().subscribe((teamList: string[]) => {
        this.teams = this.teamsService.createTeamsFromAPI(teamList);
      });
    } else {
      this.teams = JSON.parse(this.cacheService.getCacheData('teams'));
    }
  }

  private pageLoaded(): void {
    this.isLoaded = true;
  }
}
