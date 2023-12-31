import { User } from './user.model';
import { Team } from './team.model';
import { Task } from './task.model';

export interface Member extends User {
  occupation: string;
  disponibility: string;
  team: Team;
  tasks: Task[];
}
