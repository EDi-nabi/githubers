import { RepositoryInterface } from '../interfaces/repository.interface';

export class Repository {
  id: number;
  name: string;
  fullName: string;
  owner: string; // Owner.login
  htmlUrl: string; // github page
  description: string;
  url: string; // api endpoint
  homepage: string;
  contributorsUrl: string;

  constructor(data: RepositoryInterface) {
    this.id = data.id ? data.id : 0;
    this.name = data.name ? data.name : '';
    this.fullName = data.full_name ? data.full_name : '';
    this.owner = data.owner ? data.owner : '';
    this.htmlUrl = data.html_url ? data.html_url : '';
    this.description = data.description ? data.description : '';
    this.url = data.url ? data.url : '';
    this.homepage = data.homepage ? data.homepage : '';
    this.contributorsUrl = data.contributors_url ? data.contributors_url : '';
  }
}
