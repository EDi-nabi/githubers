import { ContributorInterface } from '../interfaces/contributor.interface';
import { ContributorContributionsEntities } from '../interfaces/contributor-contributions-entities.interface';
export class Contributor {
  login: string;
  id: number;
  avatarUrl: string;
  url: string; // api endpoint
  htmlUrl: string; // github page
  type: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  publicRepos?: number;
  reposUrl?: string;
  publicGists?: number;
  followers?: number;
  contributions?: ContributorContributionsEntities;
  allContributions: number;
  loaded: boolean;

  constructor(data: ContributorInterface) {
    this.login = data.login ? data.login : '';
    this.id = data.id ? data.id : 0;
    this.avatarUrl = data.avatar_url ? data.avatar_url : '';
    this.url = data.url ? data.url : '';
    this.htmlUrl = data.html_url ? data.html_url : '';
    this.type = data.type ? data.type : '';
    this.contributions = {};
    this.allContributions = 0;
    this.loaded = false;
  }

  updateProfile(data: ContributorInterface) {
    this.name = data.name ? data.name : '';
    this.company = data.company ? data.company : '';
    this.blog = data.blog ? data.blog : '';
    this.location = data.location ? data.location : '';
    this.publicRepos = data.public_repos ? data.public_repos : 0;
    this.publicGists = data.public_gists ? data.public_gists : 0;
    this.followers = data.followers ? data.followers : 0;
    this.reposUrl = data.repos_url ? data.repos_url : '';
    this.loaded = true;
  }

  public addContribution(contribution: { repository: string, contributions: number }): void {
    this.contributions[contribution.repository] = contribution;
    this.allContributions += contribution.contributions;
  }
}
