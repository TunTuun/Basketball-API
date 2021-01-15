import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { IFullInfoPlayer } from 'src/app/models/full-info-player.interface';
import { IPlayer } from 'src/app/models/player.interface';
import { ITeam } from 'src/app/models/team.interface';
import { CacheService } from 'src/app/services/cache.service';
import { GetRequestService } from 'src/app/services/get-request.service';
import { PlayerService } from 'src/app/services/player.service';
import { TeamsService } from 'src/app/services/teams.service';
import { PlayerInfoComponent } from 'src/app/shared/player-info/player-info.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {
  public teamExists: boolean;
  public team: ITeam = { name: null, image: null };
  public teamPlayers: IPlayer[] = [];
  public isLoaded: boolean;

  constructor(
    public teamsService: TeamsService,
    public playerService: PlayerService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private request: GetRequestService,
    private cacheService: CacheService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTeamName();
    this.getTeamImage();
    this.getPlayerData();
    this.pageLoaded();
  }

  openDialog(player: IPlayer): void {
    this.dialog.open(PlayerInfoComponent, { data: player });
  }

  private getTeamName(): void {
    this.route.url.subscribe((params: UrlSegment[]) => this.team.name = params[0].path);
  }

  private getTeamImage(): void {
    this.team.image = this.teamsService.findTeamImage(this.team.name);
  }

  private getPlayerData(): void {
    if (!this.cacheService.cacheDataExists('players')) {
      this.request.getPlayers().subscribe((playerList: IFullInfoPlayer[]) => {
        this.playerService.createPlayersFromAPI(playerList);
        this.teamPlayers = this.playerService.getTeamPlayers(this.team.name);
      });
    } else {
      this.teamPlayers = this.playerService.getTeamPlayers(this.team.name);
    }
  }

  private pageLoaded(): void {
    this.isLoaded = true;
  }
}
