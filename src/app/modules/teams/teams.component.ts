import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetRequestService } from 'src/app/services/get-request.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public isLoaded = false;

  constructor(
    private teamsService: TeamsService,
    private request: GetRequestService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.teamsService.InitTeams();
  }
}
