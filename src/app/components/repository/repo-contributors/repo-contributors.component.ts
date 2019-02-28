import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ContributorsService } from '../../../services/contributors.service';
import { ContributorInterface } from '../../../interfaces/contributor.interface';

@Component({
  selector: 'app-repo-contributors',
  templateUrl: './repo-contributors.component.html',
  styleUrls: ['./repo-contributors.component.less']
})
export class RepoContributorsComponent implements OnInit {
  @Input() contributor: string;
  @Input() repository: string;
  contributors$: Observable<any>;

  constructor(private contributorsService: ContributorsService) { }

  ngOnInit() {
    this.contributors$ = this.contributorsService.getRepoContributors$(this.contributor, this.repository);
  }

  loadPage(url: string) {
    this.contributors$ = this.contributorsService.getRepoContributors$(this.contributor, this.repository, url);
  }
}
