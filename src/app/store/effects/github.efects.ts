import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, concatMap, withLatestFrom, catchError, mergeMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';

import { githubConfig } from '../../config/github.config';
import { Owner } from '../../models/owner.model';
import { Repository } from '../../models/repository.model';
import { Contributor } from '../../models/contributor.model';
import { ContributorInterface } from '../../interfaces/contributor.interface';
import * as OwnerActions from '../actions/owner.actions';
import * as RepositoriesActions from '../actions/repositories.actions';
import * as ContributorsActions from '../actions/contributors.actions';
import * as UiActions from '../actions/ui.actions';
import * as fromStore from '../reducers/';
import * as fromContributors from '../reducers/contributors.reducers';

@Injectable()
export class GithubEffects {
  headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'token ' + githubConfig.token,
  });

  @Effect()
  loadOwner = this.actions$.pipe(
    ofType(OwnerActions.LOAD_OWNER),
    map((action: OwnerActions.LoadOwner) => action.payload.login),
    switchMap((login: string) => {
      return this.http.get(githubConfig.url + '/users/' + login, { headers: this.headers });
    }),
    switchMap((response: Response) => {
      const owner = new Owner(response.json());
      return [
        new OwnerActions.SaveOwner({ owner }),
        new RepositoriesActions.LoadRepositories({ owner}),
      ];
    }),
  );

  @Effect()
  loadRepositories = this.actions$.pipe(
    ofType(RepositoriesActions.LOAD_REPOSITORIES),
    map((action: RepositoriesActions.LoadRepositories) => action.payload.owner),
    switchMap((owner: Owner) => {
      const pages = Math.ceil(owner.publicRepos / githubConfig.initPerPage);
      return from(Array.from(new Array(pages), (val, index) => `${owner.reposUrl}?page=${index + 1}&per_page=${githubConfig.initPerPage}`));
    }),
    mergeMap((url: string) => this.http.get(url, { headers: this.headers })),
    switchMap((response: Response) => {
      const repositories = response.json().map(repository => new Repository(repository));
      const nextLoadActions = repositories.map((repository: Repository) => {
        if (githubConfig.limit.length && !githubConfig.limit.includes(repository.name)) {
          return undefined;
        } else {
            return new ContributorsActions.LoadContributors({ repository });
          }
      }).filter(item => item);
      return [
        new RepositoriesActions.SaveRepositories({ repositories }),
        ...nextLoadActions,
      ];
    }),
  );

  @Effect()
  loadContributors = this.actions$.pipe(
    ofType(ContributorsActions.LOAD_CONTRIBUTORS),
    map((action: ContributorsActions.LoadContributors) => action.payload.repository),
    mergeMap((repository: Repository) => {
      return this.http.get(repository.contributorsUrl + '?page=1&per_page=1', { headers: this.headers });
    }),
    concatMap((response: Response) => {
      let pages = 1;
      const contributorsUrl = response.url.split('?')[0];
      if (response.headers.get('link')) {
        const link = response.headers.get('link').split(',').filter(item => item.search('last') !== -1)[0];
        const contributorsCount = link.substr(link.indexOf('=') + 1, link.indexOf('&') - link.indexOf('=') - 1);
        pages = Math.ceil(+contributorsCount / githubConfig.initPerPage);
      }
      return from(Array.from(new Array(pages), (val, index) => {
        return `${contributorsUrl}?page=${index + 1}&per_page=${githubConfig.initPerPage}`;
      }));
    }),
    mergeMap((url: string) => {
      return this.http.get(url, { headers: this.headers });
    }),
    concatMap((response: Response) => {
      const repoName = response.url.split('/')[5];
      let contributors = response.json();
      if (!contributors) {
        return [
          new ContributorsActions.PreventInfiniteLoop(),
        ];
      } else {
        contributors = contributors.map(contributor => {
          const ctb = new Contributor(contributor);
          ctb.addContribution({ repository: repoName, contributions: contributor.contributions });
          return ctb;
        });
        const nextSaveActions = contributors.map((contributor: Contributor) => {
          return new ContributorsActions.SaveContributor({ contributor });
        });
        return [
          ...nextSaveActions,
          new ContributorsActions.LoadContributorsDetails({ contributors }),
        ];
      }
    }),
  );

  @Effect()
  loadContributorsDetails = this.actions$.pipe(
    ofType(ContributorsActions.LOAD_CONTRIBUTORS_DETAILS),
    map((action: ContributorsActions.LoadContributorsDetails) => action.payload.contributors),
    withLatestFrom(this.store$.select(fromStore.getAllContributors)),
    concatMap(([contributors, contributorsState]) => {
      const nextLoadActions = contributors.map((contributor: Contributor) => {
        return contributorsState[contributor.login].loaded
        ? undefined
        : new ContributorsActions.LoadContributorDetails({ contributor });
      }).filter(item => item);
      return [
        ...nextLoadActions,
        new ContributorsActions.PreventInfiniteLoop(),
        new UiActions.SetLoaded({ loaded: true }),
      ];
    }),
  );

  @Effect()
  loadContributorDetails = this.actions$.pipe(
    ofType(ContributorsActions.LOAD_CONTRIBUTOR_DETAILS),
    map((action: ContributorsActions.LoadContributorDetails) => action.payload.contributor),
    concatMap((contributor: Contributor) => this.http.get(contributor.url, { headers: this.headers })),
    map((result: Response) => result.json()),
    map((contributor: ContributorInterface) => {
      const ctb = new Contributor(contributor);
      ctb.updateProfile(contributor);
      return new ContributorsActions.UpdateContributor({ contributor: ctb });
    }),
  );

  // @Effect()
  // loadUserRepositories = this.actions$.pipe(
  //   ofType(RepositoriesActions.LOAD_USER_REPOSITORIES),
  //   map((action: RepositoriesActions.LoadUserRepositories) => action.payload.login),
  //   concatMap((login: string) => this.store$.select(fromStore.getContributor)),
  //   concatMap((contributor: Contributor) => {
  //     const pages = Math.ceil(contributor.publicRepos / githubConfig.initPerPage);
  //     return from(Array.from(new Array(pages), (val, index) => {
  //       return `${contributor.reposUrl}?page=${index + 1}&per_page=${githubConfig.initPerPage}`;
  //     }));
  //   }),
  //   concatMap((url: string) => this.http.get(url, { headers: this.headers })),
  //   concatMap((response: Response) => {
  //     const repositories = response.json().map(repository => new Repository(repository));
  //     return [
  //       new RepositoriesActions.SaveUserRepositories({ repositories }),
  //     ];
  //   }),
  // );

  constructor(
    private actions$: Actions,
    private http: Http,
    private store$: Store<fromContributors.State>
  ) { }
}
