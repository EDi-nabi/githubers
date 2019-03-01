import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Contributor } from '../../models/contributor.model';
import { Repository } from '../../models/repository.model';
import { ContributorsService } from '../../services/contributors.service';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.less']
})
export class ContributorComponent implements OnInit, OnDestroy {
  contributor$: Observable<Contributor>;
  contributorSubscription: Subscription;

  constructor(
    private contributorsService: ContributorsService,
    private router: Router,
  ) {
    this.contributor$ = this.contributorsService.getContributor$();
    this.contributorSubscription = this.contributor$.subscribe((contributor) => {
      if (!contributor) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.contributorSubscription.unsubscribe();
  }

}
