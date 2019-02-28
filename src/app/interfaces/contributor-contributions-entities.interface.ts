export interface ContributorContributionsEntities {
  [repository: string]: {
    repository: string;
    contributions: number;
  };
}
