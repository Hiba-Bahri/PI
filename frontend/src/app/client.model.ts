import { User } from './user.model';

export interface client extends User {
  tel: string;
}