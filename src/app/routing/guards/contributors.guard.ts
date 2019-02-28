import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ContributorsService } from '../../services/contributors.service';

@Injectable({
  providedIn: 'root'
})
export class ContributorsGuard implements CanActivate {
  constructor(
    private contributorsService: ContributorsService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.contributorsService.dispatchSetPage(+next.params.page);
    this.contributorsService.dispatchSetSort(next.params.sort);
    return true;
  }
}
