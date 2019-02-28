export interface OwnerInterface {
  login: string;
  id?: number;
  avatar_url?: string;
  type?: string;
  public_repos?: number;
  url?: string; // api endpoint
  html_url?: string; // github page
  repos_url?: string; // list of repos, api endpoint
}
