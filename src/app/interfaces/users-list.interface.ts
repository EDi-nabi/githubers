import { UserInterface } from "./user.interface";

export interface UsersListInterface {
  list: UserInterface[] | null;
  page: number;
  pages: number;
  next: string;
  prev: string;
}
