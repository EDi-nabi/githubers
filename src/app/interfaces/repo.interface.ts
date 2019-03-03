import { UserInterface } from './user.interface';

export interface RepoInterface {
  id: number;
  name: string;
  full_name: string;
  owner: UserInterface; // Owner.login
  html_url: string; // github page
  description: string;
  url: string; // api endpoint
  homepage: string;
  language: string;
  contributors_url: string;
  stargazers_count: number;
}
