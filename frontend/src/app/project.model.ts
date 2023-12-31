import { Team } from './team.model';
import { Task } from './task.model';
import { client } from './Client.model';

export interface Project {
  id: number;
  title: string;
  description: string;
  owner: client;
  technologies: string;
  keywords: string;
  team: Team;
  status: string;
  methodology: string;
  tasks: Task[];
}
