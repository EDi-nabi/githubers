import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, share, take, catchError } from 'rxjs/operators';

import { githubConfig } from '../config/github.config';
import { RepoInterface } from '../interfaces/repo.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReposService {
  headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'token ' + githubConfig.token,
  });

  constructor(
    private http: Http,
    private router: Router,
  ) { }

  getRepo$(user: string, repo: string): Observable<RepoInterface> {
    const url = `${githubConfig.url}/repos/${user}/${repo}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      take(1),
      catchError(error => {
        return of(error);
      }),
      map((response: Response) => response.json()),
      share()
    );
  }

  getRepos$(url: string = '', user: string) {
    if (!url) {
      url = `${githubConfig.url}/users/${user}/repos?page=1&per_page=${githubConfig.reposPerPage}`;
    }
    return this.http.get(url, { headers: this.headers }).pipe(
      catchError(error => {
        return of(error);
      }),
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

  findRepos(query: string) {
    const url = `${githubConfig.url}/search/repositories?q=${query}&sort=stars&order=desc`;
    if (query) {
      return this.http.get(url).pipe(
        map((response: Response) => {
          return response.json().items;
        }),
      );
    } else {
      return of([]);
    }
  }

}
