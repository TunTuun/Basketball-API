import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_PLAYER_IMAGE, DEFAULT_TEAM_IMAGE } from 'src/app/constants/app.const';
import { IFullInfoPlayer } from 'src/app/models/full-info-player.interface';
import { IPlayer } from 'src/app/models/player.interface';
import { ITeam } from 'src/app/models/team.interface';
import { GetRequestService } from 'src/app/services/get-request.service';
import { TeamsService } from 'src/app/services/teams.service';
import { PlayerInfoComponent } from 'src/app/shared/player-info/player-info.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {
  public team: ITeam = {name: null, image: null};
  public teamPlayers: IPlayer[] = [];
  public isLoaded = false;
  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private request: GetRequestService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => this.team.name = params[0].path);
    this.team.image = this.teamsService.findTeamImage(this.team.name);
    this.request.getTeamPlayers(this.team.name).subscribe((playerList: IFullInfoPlayer[]) => {
      playerList.forEach(element => {
        const fullname = element.name.split(' ');
        const photoURL = this.request.getImage(fullname[1], fullname[0]);
        this.teamPlayers.push({
          name: fullname[1],
          surname: fullname[0],
          photo: photoURL,
          team: element.team_name,
          gamesPlayed: element.games_played,
          playerRating: element.player_efficiency_rating
        });
        this.isLoaded = true;
      });
    });
  }

  setTeamDefaultImage(event) {
    event.target.src = DEFAULT_TEAM_IMAGE;
  }

  setPlayerDefaultImage(event) {
    event.target.src = DEFAULT_PLAYER_IMAGE;
  }

  openDialog(player) {
    this.dialog.open(PlayerInfoComponent, { data: player });
  }
}
