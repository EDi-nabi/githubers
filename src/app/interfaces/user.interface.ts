
export interface UserInterface {
  login: string;
  id: number;
  avatar_url: string;
  url: string; // api endpoint
  html_url: string; // github page
  type: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  public_repos?: number;
  repos_url?: string;
  public_gists?: number;
  followers?: number;
  contributions?: number;
}
