import { RepoInterface } from 'src/app/interfaces/repo.interface';

export interface ReposListInterface {
  list: RepoInterface[] | null;
  page: number;
  pages: number;
  next: string;
  prev: string;
}
