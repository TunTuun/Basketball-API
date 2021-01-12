import { Component, OnInit } from '@angular/core';
import { DEFAULT_TEAM_IMAGE } from 'src/app/constants/app.const';
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
  public isLoaded = false;

  constructor(
    private teamsService: TeamsService,
    private request: GetRequestService
  ) { }

  ngOnInit(): void {
    this.request.getTeams().subscribe((teamList: string[]) => {
      let teams: ITeam[] = [];
      teamList.forEach(element => {
        const imageURL = this.teamsService.findTeamImage(element);
        teams.push({
          name: element,
          image: imageURL
        });
      });
      this.teams = teams;
      this.isLoaded = true;
    });
  }

  setDefaultImage(event) {
    event.target.src = DEFAULT_TEAM_IMAGE;
  }
}
