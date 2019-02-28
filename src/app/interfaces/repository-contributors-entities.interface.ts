export interface RepositoryContributorsEntities {
  [login: string]: {
    login: string;
    contributions: number;
  };
}
