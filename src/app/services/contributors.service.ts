import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { map, switchMap, share } from 'rxjs/operators';

import * as fromStore from '../store/reducers/';
import * as fromApp from '../store/reducers/app.reducers';
import * as fromContributors from '../store/reducers/contributors.reducers';
import * as ContributorsActions from '../store/actions/contributors.actions';
import { Contributor } from '../models/contributor.model';
import { ContributorEntities } from '../interfaces/contributor-entities.interface';
import { githubConfig } from '../config/github.config';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService {
  headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'token ' + githubConfig.token,
  });
  public contributors$: Observable<Contributor[]>;
  public contributor$: Observable<any>;
  public contributorsCounter$: Observable<number>;
  public contributorsNextPage$: Observable<number>;
  public contributorsPrevPage$: Observable<number>;
  public contributorsPages$: Observable<number>;
  public contributorsSort$: Observable<string>;

  constructor(
    private store: Store<fromApp.AppState>,
    private http: Http,
  ) { }

  // get from state
  getContributors$() {
    return this.contributors$
      ? this.contributors$
      : this.contributors$
      = this.store.select(fromStore.getContributors);
  }

  getContributor$() {
    return this.contributor$
      ? this.contributor$
      : this.contributor$
      = this.store.select(fromStore.getContributor);
  }

  getContributorsCounter$() {
    return this.contributorsCounter$
      ? this.contributorsCounter$
      : this.contributorsCounter$
      = this.store.select(fromStore.getContributorsCounter);
  }

  getContributorsNextPage$() {
    return this.contributorsNextPage$
      ? this.contributorsNextPage$
      : this.contributorsNextPage$
      = this.store.select(fromStore.getContributorsNextPage);
  }

  getContributorsPrevPage$() {
    return this.contributorsPrevPage$
      ? this.contributorsPrevPage$
      : this.contributorsPrevPage$
      = this.store.select(fromStore.getContributorsPrevPage);
  }

  getContributorsPages$() {
    return this.contributorsPages$
      ? this.contributorsPages$
      : this.contributorsPages$
      = this.store.select(fromStore.getContributorsPages);
  }

  getContributorsSort$() {
    return this.contributorsSort$
      ? this.contributorsSort$
      : this.contributorsSort$
      = this.store.select(fromStore.getContributorsSort);
  }

  // dispatch actions
  dispatchSetPage(page: number) {
    this.store.dispatch(new ContributorsActions.SetPage({ page }));
  }

  dispatchSetSort(sort: string) {
    this.store.dispatch(new ContributorsActions.SetSort({ sort }));
  }

  dispatchSetActiveContributor(login: string) {
    this.store.dispatch(new ContributorsActions.SetActiveContributor({ login }));
  }

  // load from github
  getRepoContributors$(user: string, name: string, url: string = '') {
    if (!url) {
      url = `https://api.github.com/repos/${user}/${name}/contributors?page=1&per_page=${githubConfig.reposPerPage}`;
    }
    return this.http.get(url, { headers: this.headers }).pipe(
      map((response: Response) => {
        const contributors = { list: [], page: 1, pages: 1, next: '', prev: '', };
        contributors.list = response.json();
        const header = response.headers.get('link');
        if (header) {
          const linkPrev = header.split(',').filter(item => item.search('prev') !== -1)[0];
          const linkNext = header.split(',').filter(item => item.search('next') !== -1)[0];
          const linkLast = header.split(',').filter(item => item.search('last') !== -1)[0];
          contributors.prev = linkPrev ? linkPrev.slice(linkPrev.indexOf('<') + 1, linkPrev.indexOf('>')) : '';
          contributors.next = linkNext ? linkNext.slice(linkNext.indexOf('<') + 1, linkNext.indexOf('>')) : '';
          contributors.pages = linkLast
            ? +linkLast.slice(linkLast.indexOf('?page=') + 6, linkLast.indexOf('&'))
            : linkPrev
              ? +linkPrev.slice(linkPrev.indexOf('?page=') + 6, linkPrev.indexOf('&')) + 1
              : 1;
          contributors.page = linkPrev ? +linkPrev.slice(linkPrev.indexOf('?page=') + 6, linkPrev.indexOf('&')) + 1 : 1;
        }
        return contributors;
      }),
      share()
    );
  }

}
