import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ReposService } from '../../services/repos.service';
import { RepoInterface } from 'src/app/interfaces/repo.interface';

@Component({
  selector: 'app-repository',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.less']
})
export class RepoComponent implements OnInit {
  repo$: Observable<RepoInterface>;

  constructor(
    private reposService: ReposService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.repo$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.reposService.getRepo$(params.user, params.repo);
      }),
    );
  }

}
