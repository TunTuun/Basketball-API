import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../Services/teams.service'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private teamsService: TeamsService) { }
  ngOnInit(): void {
    this.teamsService.InitTeams();
  }

}
