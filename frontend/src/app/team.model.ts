import { Member } from './member.model';

export interface Team {
    id: number;
    name: string;
    members: Member[];
  }
  