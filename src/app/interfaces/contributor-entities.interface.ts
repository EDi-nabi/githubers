import { Contributor } from '../models/contributor.model';

export interface ContributorEntities {
  [login: string]: Contributor;
}
