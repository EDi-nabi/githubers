import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { UiService } from '../../services/ui.service';
import { OwnerService } from '../../services/owner.service';
import { githubConfig } from '../../config/github.config';

@Injectable({
  providedIn: 'root'
})
export class LoadStoreGuard implements CanActivate {
  constructor(
    private uiService: UiService,
    private ownerService: OwnerService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.uiService.getLoaded$().subscribe((loaded) => {
      if (!loaded) {
        this.ownerService.dispatchLoadOwner(githubConfig.organization);
        this.uiService.dispatchSetLoaded(true);
      }
    });
    return true;
  }
}
