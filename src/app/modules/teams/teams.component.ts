import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITeam } from 'src/app/models/team.interface';
import { CacheService } from 'src/app/services/cache.service';
import { GetRequestService } from 'src/app/services/get-request.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})

export class TeamsComponent implements OnInit, OnDestroy {
  public teams: ITeam[];
  public isLoaded: boolean;
  public error404: boolean;
  private subscription: Subscription;

  constructor(
    public teamsService: TeamsService,
    private request: GetRequestService,
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    this.initTeams();
    this.pageLoaded();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initTeams(): void {
    if (!this.cacheService.cacheDataExists('teams')) {
      this.subscription = this.request.getTeams().subscribe((teamList: string[]) => {
        this.teams = this.teamsService.createTeamsFromAPI(teamList);
      },
      () => {
        this.error404 = true;
      });
    } else {
      this.teams = JSON.parse(this.cacheService.getCacheData('teams'));
    }
  }

  private pageLoaded(): void {
    this.isLoaded = true;
  }
}
