import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { CacheService } from '../services/cache.service';

import { TeamsService } from '../services/teams.service';

@Injectable()
export class TeamGuard implements CanActivate {

  constructor(
    private teamsService: TeamsService,
    private router: Router,
    private cacheService: CacheService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (this.cacheService.getCacheData('teams') && this.teamsService.teamExists(route.params.team)) {
      return true;
    } else {
      return this.router.parseUrl('/teams');
    }
  }
}
