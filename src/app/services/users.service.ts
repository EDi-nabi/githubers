import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, from } from 'rxjs';
import { map, switchMap, share } from 'rxjs/operators';

import { githubConfig } from '../config/github.config';

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
  ) { }

  // load from github
  getUsers$(url: string = '', user: string = '', repo: string = '', ) {
    if (!url) {
      url = `https://api.github.com/repos/${user}/${repo}/contributors?page=1&per_page=${githubConfig.usersPerPage}`;
    }
    return this.http.get(url, { headers: this.headers }).pipe(
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
