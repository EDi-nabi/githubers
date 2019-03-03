import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { RepoInterface } from '../../interfaces/repo.interface';
import { ReposService } from '../../services/repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.less']
})
export class ReposComponent implements OnInit, OnChanges {
  @Input() user: string;
  repos$: Observable<any>;

  constructor(
    private reposService: ReposService,
  ) { }

  ngOnInit() {
    this.loadPage('');
  }

  loadPage(url: string) {
    this.repos$ = this.reposService.getRepos$(url, this.user);
  }

  ngOnChanges() {
    this.loadPage('');
  }

}
