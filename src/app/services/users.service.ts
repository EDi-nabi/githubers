import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, share, catchError, take } from 'rxjs/operators';

import { githubConfig } from '../config/github.config';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'token ' + githubConfig.token,
  });

  constructor(
    private http: Http,
    private router: Router,
  ) { }


  getUser$(user: string): Observable<UserInterface> {
    const url = `${githubConfig.url}/users/${user}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      take(1),
      catchError(error => {
        this.router.navigate(['/not-found']);
        return of(error);
      }),
      map((response: Response) => response.json()),
      share()
    );
  }

  getUsers$(url: string = '', user: string, repo: string = '', ) {
    if (!url && repo) { // get contributors
      url = `${githubConfig.url}/repos/${user}/${repo}/contributors?page=1&per_page=${githubConfig.usersPerPage}`;
    }
    if (!url && !repo) { // get followers
      url = `${githubConfig.url}/users/${user}/followers?page=1&per_page=${githubConfig.usersPerPage}`;
    }
    return this.http.get(url, { headers: this.headers }).pipe(
      catchError(error => {
        return of(error);
      }),
      map((response: Response) => {
        const users = { list: [], page: 1, pages: 1, next: '', prev: '', };
        users.list = response.json();
        const header = response.headers.get('link');
        if (header) {
          const linkPrev = header.split(',').filter(item => item.search('prev') !== -1)[0];
          const linkNext = header.split(',').filter(item => item.search('next') !== -1)[0];
          const linkLast = header.split(',').filter(item => item.search('last') !== -1)[0];
          users.prev = linkPrev ? linkPrev.slice(linkPrev.indexOf('<') + 1, linkPrev.indexOf('>')) : '';
          users.next = linkNext ? linkNext.slice(linkNext.indexOf('<') + 1, linkNext.indexOf('>')) : '';
          users.pages = linkLast
            ? +linkLast.slice(linkLast.indexOf('?page=') + 6, linkLast.indexOf('&'))
            : linkPrev
              ? +linkPrev.slice(linkPrev.indexOf('?page=') + 6, linkPrev.indexOf('&')) + 1
              : 1;
          users.page = linkPrev ? +linkPrev.slice(linkPrev.indexOf('?page=') + 6, linkPrev.indexOf('&')) + 1 : 1;
        }
        return users;
      }),
      share()
    );
  }

}
