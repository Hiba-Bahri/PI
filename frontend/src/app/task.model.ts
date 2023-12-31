import { Member } from './member.model';
import { Project } from './project.model';

export interface Task {
  id: number;
  description: string;
  progress: string;
  member: Member;
  project: Project;
}
