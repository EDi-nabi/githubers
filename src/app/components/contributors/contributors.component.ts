import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Contributor } from '../../models/contributor.model';
import { ContributorsService } from '../../services/contributors.service';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.less']
})
export class ContributorsComponent implements OnInit, OnDestroy {
  contributors$: Observable<Contributor[]>;
  prevPage$: Observable<number>;
  nextPage$: Observable<number>;
  pages$: Observable<number>;
  sort$: Observable<string>;
  routeSub: Subscription;
  sort: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contributorsService: ContributorsService
  ) { }

  ngOnInit() {
    this.contributors$ = this.contributorsService.getContributors$();
    this.prevPage$ = this.contributorsService.getContributorsPrevPage$();
    this.nextPage$ = this.contributorsService.getContributorsNextPage$();
    this.pages$ = this.contributorsService.getContributorsPages$();
    this.sort$ = this.contributorsService.getContributorsSort$();

    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
        this.sort = params['sort'];
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
