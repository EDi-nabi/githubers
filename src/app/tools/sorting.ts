import { Contributor } from '../models/contributor.model';

export class Sorting {
  static sortByContributions = (a: Contributor, b: Contributor) => {
    return a.allContributions < b.allContributions
    ?  1 : a.allContributions > b.allContributions
    ? -1 : 0;
  }

  static sortByFollowers = (a: Contributor, b: Contributor) => {
    return a.followers < b.followers
    ?  1 : a.followers > b.followers
    ? -1 : 0;
  }

  static sortByRepositories = (a: Contributor, b: Contributor) => {
    return a.publicRepos < b.publicRepos
    ?  1 : a.publicRepos > b.publicRepos
    ? -1 : 0;
  }

  static sortByGists = (a: Contributor, b: Contributor) => {
    return a.publicGists < b.publicGists
    ?  1 : a.publicGists > b.publicGists
    ? -1 : 0;
  }
}
