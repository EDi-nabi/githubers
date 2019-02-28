import { RepositoryContributorsEntities } from '../interfaces/repository-contributors-entities.interface';

export interface RepositoryInterface {
  id: number;
  name: string;
  full_name: string;
  owner?: string; // Owner.login
  html_url: string; // github page
  description: string;
  url: string; // api endpoint
  homepage: string;
  language: string;
  contributors_url: string;
  contributors?: RepositoryContributorsEntities;
}
