import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, share, catchError, take } from 'rxjs/operators';

import { githubConfig } from '../config/github.config';
import { UserInterface } from '../interfaces/user.interface';
import { UsersListInterface } from '../interfaces/users-list.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'token ' + githubConfig.token,
  });

  constructor(
    private http: HttpClient,
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
      // map((response: HttpResponse<UserInterface>) => response),
      share(),
    );
  }

  getUsers$(url: string = '', user: string, repo: string = '', ): Observable<UsersListInterface> {
    if (!url && repo) { // get contributors
      url = `${githubConfig.url}/repos/${user}/${repo}/contributors?page=1&per_page=${githubConfig.usersPerPage}`;
    }
    if (!url && !repo) { // get followers
      url = `${githubConfig.url}/users/${user}/followers?page=1&per_page=${githubConfig.usersPerPage}`;
    }
    return this.http.get(url, { headers: this.headers, observe: 'response' }).pipe(
      catchError(error => {
        return of(error);
      }),
      map((response: HttpResponse<UserInterface[]>) => {
        const users: UsersListInterface = { list: [], page: 1, pages: 1, next: '', prev: '', };
        users.list = response.body;
        const header = response.headers.get('link');
        if (header) {
          const linkPrev = header.split(',').filter((item: string) => item.search('prev') !== -1)[0];
          const linkNext = header.split(',').filter((item: string) => item.search('next') !== -1)[0];
          const linkLast = header.split(',').filter((item: string) => item.search('last') !== -1)[0];
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
