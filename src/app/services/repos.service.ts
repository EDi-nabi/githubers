import { ReposListInterface } from './../interfaces/repos-list.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, share, take, catchError } from 'rxjs/operators';

import { githubConfig } from '../config/github.config';
import { RepoInterface } from '../interfaces/repo.interface';
import { Router } from '@angular/router';
import { SearchResponseInterface } from '../interfaces/search-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ReposService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'token ' + githubConfig.token,
  });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getRepo$(user: string, repo: string): Observable<RepoInterface> {
    const url = `${githubConfig.url}/repos/${user}/${repo}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      take(1),
      catchError(error => {
        return of(error);
      }),
      share()
    );
  }

  getRepos$(url: string = '', user: string) {
    if (!url) {
      url = `${githubConfig.url}/users/${user}/repos?page=1&per_page=${githubConfig.reposPerPage}&sort=stars&order=desc`;
    }
    return this.http.get(url, { headers: this.headers, observe: 'response' }).pipe(
      catchError(error => {
        return of(error);
      }),
      map((response: HttpResponse<RepoInterface[]>) => {
        const repos: ReposListInterface = { list: [], page: 1, pages: 1, next: '', prev: '', };
        repos.list = response.body;
        const header = response.headers.get('link');
        if (header) {
          const linkPrev = header.split(',').filter((item: string) => item.search('prev') !== -1)[0];
          const linkNext = header.split(',').filter((item: string) => item.search('next') !== -1)[0];
          const linkLast = header.split(',').filter((item: string) => item.search('last') !== -1)[0];
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

  findRepos(query: string): Observable<RepoInterface[]> {
    const url = `${githubConfig.url}/search/repositories?q=${query}&sort=stars&order=desc`;
    if (query) {
      return this.http.get(url).pipe(
        map((response: any) => response['items']),
      );
    } else {
      return of([]) as Observable<RepoInterface[]>;
    }
  }

}
