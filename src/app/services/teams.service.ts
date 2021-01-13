import { Injectable } from '@angular/core';
import { TEAMS_IMAGE_URL } from '../constants/app.const'

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  findTeamImage(teamName) {
    return TEAMS_IMAGE_URL + teamName + '.png';
  }
}
