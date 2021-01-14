import { Component, OnInit } from '@angular/core';
import { ITeam } from 'src/app/models/team.interface';
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
    private request: GetRequestService
  ) { }

  ngOnInit(): void {
    this.request.getTeams().subscribe((teamList: string[]) => {
      this.teams = this.teamsService.createTeamsFromAPI(teamList);
      this.isLoaded = true;
    });
  }
}
