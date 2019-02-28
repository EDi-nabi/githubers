import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { map, switchMap, share } from 'rxjs/operators';

import * as fromStore from '../store/reducers/';
import * as fromApp from '../store/reducers/app.reducers';
import * as fromRepositories from '../store/reducers/repositories.reducers';
import * as RepositoriesActions from '../store/actions/repositories.actions';
import { Repository } from '../models/repository.model';
import { RepositoryEntities } from '../interfaces/repository-entities.interface';
import { Owner } from '../models/owner.model';
import { Contributor } from '../models/contributor.model';
import { githubConfig } from '../config/github.config';
import { RepositoryInterface } from '../interfaces/repository.interface';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'token ' + githubConfig.token,
  });
  repositoriesState$: Observable<fromRepositories.State>;
  repositories$: Observable<Repository[]>;
  // repository$: Observable<Repository>;
  repository$: Observable<any>;

  constructor(
    private store: Store<fromApp.AppState>,
    private http: Http,
  ) { }

  // get from state
  getRepositories$() {
    return this.repositories$
      ? this.repositories$
      : this.repositories$
      = this.store.select(fromStore.getRepositories);
  }

  getRepository$(name: string) {
    return this.repository$
      ? this.repository$
      : this.repository$
      = this.store.select(fromStore.getRepository, { props: { name } });
  }

  // dispatch actions
  dispatchLoadRepositories(owner: Owner) {
    this.store.dispatch(new RepositoriesActions.LoadRepositories({ owner }));
  }

  dispatchLoadUserRepositories(login: string) {
    this.store.dispatch(new RepositoriesActions.LoadUserRepositories({ login }));
  }

  // load from github
  getUserRepositories$(user: string, url: string = '') {
    if (!url) {
      url = `https://api.github.com/users/${user}/repos?page=1&per_page=${githubConfig.reposPerPage}`;
    }
    return this.http.get(url, { headers: this.headers }).pipe(
      map((response: Response) => {
        const repos = { list: [], page: 1, pages: 1, next: '', prev: '', };
        repos.list = response.json();
        const header = response.headers.get('link');
        if (header) {
          const linkPrev = header.split(',').filter(item => item.search('prev') !== -1)[0];
          const linkNext = header.split(',').filter(item => item.search('next') !== -1)[0];
          const linkLast = header.split(',').filter(item => item.search('last') !== -1)[0];
          repos.prev = linkPrev ? linkPrev.slice(linkPrev.indexOf('<') + 1, linkPrev.indexOf('>')) : '';
          repos.next = linkNext ? linkNext.slice(linkNext.indexOf('<') + 1, linkNext.indexOf('>')) : '';
          repos.pages = linkLast
          ? +linkLast.slice(linkLast.indexOf('?page=') + 6, linkLast.indexOf('&'))
          : linkPrev
          ? +linkPrev.slice(linkPrev.indexOf('?page=') + 6, linkPrev.indexOf('&')) + 1
          : 1;
          repos.page = linkPrev ? +linkPrev.slice(linkPrev.indexOf('?page=') + 6, linkPrev.indexOf('&')) + 1 : 1;
        }
        return repos;
      }),
      share()
    );
  }

  loadRepository(user: string, name: string): Observable<RepositoryInterface> {
    const url = `https://api.github.com/repos/${user}/${name}`;
    console.log(url);
    return this.http.get(url, { headers: this.headers }).pipe(
      map((response: Response) => response.json()),
      share()
    );
  }

}
