import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { RepositoriesService } from '../../../services/repositories.service';
import { RepositoryInterface } from '../../../interfaces/repository.interface';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.less']
})
export class ReposComponent implements OnInit {
  @Input() contributor: string;
  repositories$: Observable<any>;

  constructor(private repositoriesService: RepositoriesService) { }

  ngOnInit() {
    this.repositories$ = this.repositoriesService.getUserRepositories$(this.contributor);
  }

  loadPage(url: string) {
    this.repositories$ = this.repositoriesService.getUserRepositories$(this.contributor, url);
  }
}
