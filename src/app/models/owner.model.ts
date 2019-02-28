import { OwnerInterface } from '../interfaces/owner.interface';

export class Owner {
  login: string;
  id?: number;
  avatarUrl?: string;
  type?: string;
  publicRepos?: number;
  url?: string; // api endpoint
  htmlUrl?: string; // github page
  reposUrl?: string; // list of repos, api endpoint

  constructor(data: OwnerInterface) {
    this.login = data.login ? data.login : '';
    this.id = data.id ? data.id : 0;
    this.avatarUrl = data.avatar_url ? data.avatar_url : '';
    this.type = data.type ? data.type : '';
    this.publicRepos = data.public_repos ? data.public_repos : 0;
    this.url = data.url ? data.url : '';
    this.htmlUrl = data.html_url ? data.html_url : '';
    this.reposUrl = data.repos_url ? data.repos_url : '';
  }
}
