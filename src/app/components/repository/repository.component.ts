import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { RepositoriesService } from '../../services/repositories.service';
import { RepositoryInterface } from 'src/app/interfaces/repository.interface';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.less']
})
export class RepositoryComponent implements OnInit, OnDestroy {
  contributor: string;
  repositoryName: string;
  repository$: Observable<RepositoryInterface>;
  routeSub: Subscription;

  constructor(
    private repositoriesService: RepositoriesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
        this.contributor = params['user'];
        this.repositoryName = params['name'];
        this.repository$ = this.repositoriesService.loadRepository(params['user'], params['name']);
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
