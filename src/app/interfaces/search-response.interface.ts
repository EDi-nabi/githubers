import { RepoInterface } from 'src/app/interfaces/repo.interface';

export interface SearchResponseInterface {
  incomplete_results: boolean;
  items: RepoInterface[];
  total_count: number;
}
