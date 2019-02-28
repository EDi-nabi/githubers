import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { ContributorsService } from '../../services/contributors.service';
import { RepositoriesService } from '../../services/repositories.service';
import { switchMap } from 'rxjs/operators';
import { Contributor } from 'src/app/models/contributor.model';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class ContributorGuard implements CanActivate {
  constructor(
    private contributorsService: ContributorsService,
    private repositoriesService: RepositoriesService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.contributorsService.dispatchSetActiveContributor(next.params.login);
    return true;
  }
}

